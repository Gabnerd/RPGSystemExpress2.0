const ItemController = require('../controller/item.cotroller');

module.exports = (app) => {
    var itens = new ItemController();

    app.get('/api/itens', itens.index);
    app.get('/api/itens/:idPlayer', itens.listByUserId);
    app.post('/api/itens', itens.insertItem);
    app.delete('/api/itens', itens.removeItem);
}