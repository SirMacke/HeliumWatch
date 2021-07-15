const mongoose = require('mongoose');
//const config = require('config');

// OLD CONFIG
//const db = config.get('db');

// ENV CONFIG
let dbUrl = process.env.DB_URL || 'mongodb://db/heliumwatch';

const connect = async () => {
  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  console.log("Connected to MongoDB: " + dbUrl);
};

const close = () => mongoose.connection.close();

module.exports = { connect, close, url: dbUrl };