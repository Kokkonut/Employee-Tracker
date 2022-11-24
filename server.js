const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);