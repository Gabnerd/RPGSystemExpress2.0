const db = require('../database/connection');

module.exports = class ItemController {
    async index(req, res) {
        try {
            await db('Item').then((item) => {
                res.json(item);
            })
        } catch (error) {
            console.log(error);
        }
    }

    async listByUserId(req, res) {
        const idPlayer = req.params.idPlayer;
        try {
            await db('item').where('idPlayer', '=', idPlayer).select(['nome', 'atributo']).then((item) => {
                res.json(item);
            })
        } catch (error) {
            console.log(error);
        }
    }

    async insertItem(req, res) {
        const item = req.body;

        const trx = await db.transaction();

        try {
            await trx('item').insert(item);
            await trx.commit();

            return res.status(201).send();
        } catch (error) {
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }

    async removeItem(req, res) {
        const idItem = req.body.idItem;

        const trx = await db.transaction();

        try {
            await trx('item').delete().where('id', '=', idItem);
            await trx.commit();
        } catch (error) {
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }
}