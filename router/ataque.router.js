const AtaqueController = require("../controller/ataque.controller");

module.exports = (app) => {
    var ataque = new AtaqueController();
    app.get('/api/ataque', ataque.index);
    app.get('/api/ataque/:idPlayer', ataque.listByUserId);
    app.post('/api/ataque', ataque.insertAtaque);
    app.delete('/api/ataque', ataque.removeAtaque);
}