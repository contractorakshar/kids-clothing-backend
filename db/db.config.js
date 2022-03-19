var mysql = require('mysql');

let dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database:"kids-clothing"
};

const connection =  mysql.createConnection(dbConfig);

module.exports = connection;