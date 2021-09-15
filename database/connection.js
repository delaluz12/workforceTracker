//get client
const mysql = require('mysql2');

//get promise implementation - util ->
const util = require('util');

// create connection & specify util as promise
const connection = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password: '',
        database: 'workforcedb'
    },
    console.log('Connected to workforcedb database')
);

//start connection
connection.connect();

//set connection.query to use promises instead of callbacks using util.promisify() in node.js
connection.query = util.promisify(connection.query);


module.exports = connection;
