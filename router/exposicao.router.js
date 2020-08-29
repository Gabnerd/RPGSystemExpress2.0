const ExposicaoController = require('../controller/exposicao.controller');

module.exports = (app) => {
    var exposicao = new ExposicaoController();
    app.get('/api/exposicoes', exposicao.index);
    app.get('/api/exposicoes/:idPlayer', exposicao.listByUserId);
    app.post('/api/exposicoes', exposicao.insertExposicao);
    app.delete('/api/exposicoes', exposicao.removeExposicao);
}