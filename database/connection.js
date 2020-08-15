var path = require('path');
var db = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    }
});

module.exports = db;