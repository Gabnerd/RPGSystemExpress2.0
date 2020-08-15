var express = require('express');
var router = express.Router();

router.get('/mestre', (req, res, next) => {
    res.render('mestre');
})

module.exports = router;