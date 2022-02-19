const mongoose = require('mongoose');
require('env2')('.env');

if (!process.env.DB_URL) {
  throw new Error('Missing Mongodb DB_URL env var');
}

const db = mongoose.createConnection(process.env.DB_URL);

module.exports = db;