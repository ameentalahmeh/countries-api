const express = require('express');
require('env2')('.env');

const router = require('./router');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.set('PORT', process.env.PORT || 3002);

module.exports = app;