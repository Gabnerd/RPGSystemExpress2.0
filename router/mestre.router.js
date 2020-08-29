var express = require('express');
var router = express.Router();
const db = require('../database/connection');

router.get('/mestre', async(req, res, next) => {
    res.render('mestre');

})

module.exports = router;