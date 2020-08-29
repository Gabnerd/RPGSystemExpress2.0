const db = require('../database/connection');

module.exports = class AtaqueController {
    async index(req, res) {
        try {
            await db('ataque').then((ataque) => {
                res.json(ataque);
            })
        } catch (error) {
            console.log(error);
        }
    }
    async insertAtaque(req, res) {
        const ataque = req.body;

        const trx = await db.transaction();

        try {
            await trx('ataque').insert(ataque);
            await trx.commit();

            return res.status(201).send();
        } catch (error) {
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }

    async listByUserId(req, res) {
        const idPlayer = req.params.idPlayer;
        try {
            await db('ataque').where('idPlayer', '=', idPlayer).select(['nome', 'atributos', 'custo']).then((ataque) => {
                res.json(ataque);
            })
        } catch (error) {
            console.log(error);
        }
    }

    async removeAtaque(req, res) {
        const idAtaque = req.body.idAtaque;

        const trx = await db.transaction();

        try {
            await trx('ataque').delete().where('id', '=', idAtaque);
            await trx.commit();
        } catch (error) {
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }
}