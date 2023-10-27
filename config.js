const mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'eCom-Dashboard'
});

con.connect((e)=>{
    if(!e) console.warn("Connected")
})



module.exports = con;