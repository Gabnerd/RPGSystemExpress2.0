var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', { teste: 'hello world' });
});

module.exports = router;