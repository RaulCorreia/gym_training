const express = require('express');
const app = express();

require('./database');
require('dotenv').config();

const port = process.env.PORT || 3000;
const routes = require('./server/routes/index');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('', routes);

// INIT
app.listen(port, () => console.log(`Ouvindo na porta ${port}...`));