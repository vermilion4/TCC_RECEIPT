let mysql = require('mysql')
let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'tcc',
    multipleStatements: true
});

conn.connect((err)=> {
    if(!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});

module.exports = conn;