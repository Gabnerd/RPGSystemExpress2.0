var express = require('express');
var path = require('path');

var app = express();

var indexRouter = require('./router/index.router');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(3333, () => {
    console.log("Listening");
})