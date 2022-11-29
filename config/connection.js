const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Thunder1969',
    database: 'employee_db',
});

module.exports = {
    connection
}