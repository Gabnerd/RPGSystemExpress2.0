const db = require('../database/connection');

module.exports = class PlayerController {

    async index(req, res) {
        try {
            let playersObj = []
            await db('player').then((players) => {
                playersObj = players;
            });
            playersObj.map(async(player, index) => {
                await db('item').where('idPlayer', '=', player.id).select('atributo', 'nome').then((itens) => {
                    playersObj[index].inventario = itens;
                });
            });
            playersObj.map(async(player, index) => {
                await db('ataque').where('idPlayer', '=', player.id).select('nome', 'atributos', 'custo').then((ataques) => {
                    playersObj[index].ataques = ataques;
                });
            })
            playersObj.map(async(player, index) => {
                await db('exposicao').where('idPlayer', '=', player.id).select('inimigo', 'valor').then((exposicoes) => {
                    playersObj[index].exposicao = exposicoes;
                });
            });
            setTimeout(() => {
                res.json(playersObj);
            }, 30);
        } catch (error) {
            res.json({ error: error });
            console.log(error);
        }
    }

    async getByName(req, res) {
        const nome = req.params.nome;
        try {
            let playerObj;
            await db('player').where('nome', '=', nome).then((player) => {
                playerObj = player[0];
            });
            await db('item').where('idPlayer', '=', playerObj.id).select('atributo', 'nome').then((itens) => {
                playerObj.inventario = itens;
            });
            await db('ataque').where('idPlayer', '=', playerObj.id).select('nome', 'atributos', 'custo').then((ataques) => {
                playerObj.ataques = ataques;
            });
            await db('exposicao').where('idPlayer', '=', playerObj.id).select('inimigo', 'valor').then((exposicoes) => {
                playerObj.exposicao = exposicoes;
            });
            res(playerObj);
        } catch (error) {
            res.json({ error: error });
            console.log(error);
        }
    }

    async insertPlayer(req, res) {
        const {
            nome,
            forca,
            destreza,
            constituicao,
            vidaMaximo,
            vidaMinimo,
            inteligencia,
            manaMaximo,
            manaMinimo,
            perspicacia,
            movimento,
            carisma,
            primeSocor,
            level,
            sanidade,
            moedas,
            luta,
            inventario,
            ataques,
            exposicao
        } = req.body;

        const trx = await db.transaction();

        try {
            const insertedPlayerIds = await trx('player').insert({
                nome,
                forca,
                destreza,
                constituicao,
                vidaMaximo,
                vidaMinimo,
                inteligencia,
                manaMaximo,
                manaMinimo,
                perspicacia,
                movimento,
                carisma,
                primeSocor,
                level,
                sanidade,
                moedas,
                luta
            });

            const idPlayer = insertedPlayerIds[0];

            const playerItens = inventario.map((item) => {
                return {
                    idPlayer,
                    nome: item.nome,
                    atributo: item.atributo
                }
            });

            const playerAtaques = ataques.map((ataque) => {
                return {
                    idPlayer,
                    nome: ataque.nome,
                    atributos: ataque.atributos,
                    custo: ataque.custo
                }
            });
            const playerExpo = exposicao.map((expo) => {
                return {
                    idPlayer,
                    inimigo: expo.inimigo,
                    valor: expo.valor
                }
            });
            if (playerItens.length > 0) {
                await trx('item').insert(playerItens);
            }
            if (playerAtaques.length > 0) {
                await trx('ataque').insert(playerAtaques);
            }
            if (playerExpo.length > 0) {
                await trx('exposicao').insert(playerExpo);
            }

            await trx.commit();

            return res.status(201).send();
        } catch (error) {
            await trx.rollback();
            return res.status(400).json({
                error: error
            });
        }
    }
}