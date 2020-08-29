const PlayerController = require('../controller/player.controller');

module.exports = (app) => {
    var players = new PlayerController();

    app.get('/api/players', players.index);
    app.get('/api/players/:nome', players.getByName);
    app.post('/api/players', players.insertPlayer);
}