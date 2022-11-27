const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const api = require('./routes/index.js');

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Thunder1969',
        database: 'employees_DB'
    },
    console.log('Connected to the employees_DB database.')
)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

module.exports = db;