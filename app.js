var express = require('express');
var path = require('path');
const socket = require('socket.io');

var app = express();

var indexRouter = require('./router/index.router');
var mestreRouter = require('./router/mestre.router');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/socket', express.static(__dirname + '/node_modules/socket.io-client/dist/'));

app.use(indexRouter);
app.use(mestreRouter);
require('./router/player.router')(app);
require('./router/ataque.router')(app);
require('./router/exposicao.router')(app);
require('./router/item.router')(app);

var server = app.listen(3333, () => {
    console.log("Listening");
});

function newConnection(socket) {
    console.log("new connection: " + socket.id);
    socket.on('update', update);

    function update(data) {
        socket.broadcast.emit('update', data);
    }
}