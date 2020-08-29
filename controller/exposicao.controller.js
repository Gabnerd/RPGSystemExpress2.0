const db = require('../database/connection');

module.exports = class ExposicaoController {

    async index(req, res) {
        try {
            await db('exposicao').then((exposicao) => {
                res.json(exposicao);
            })
        } catch (error) {
            console.log(error);
        }
    }
    async insertExposicao(req, res) {
        const exposicao = req.body;

        const trx = await db.transaction();

        try {
            await trx('exposicao').insert(exposicao);
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
            await db('exposicao').where('idPlayer', '=', idPlayer).select(['inimigo', 'valor']).then((exposicao) => {
                res.json(exposicao);
            })
        } catch (error) {
            console.log(error);
        }
    }

    async removeExposicao(req, res) {
        const idExposicao = req.body.idExposicao;

        const trx = await db.transaction();

        try {
            await trx('exposicao').delete().where('id', '=', idExposicao);
            await trx.commit();
        } catch (error) {
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }
}