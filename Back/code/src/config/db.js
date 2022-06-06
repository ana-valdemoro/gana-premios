const mongoose = require('mongoose');
const { resolve } = require('path');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config({ path: resolve(__dirname, '../../.env') });
const config = require('./index');
const logger = require('./winston');

const env = process.env.NODE_ENV || 'development';

const options = {
  dbName: config.mongo.database,
  maxPoolSize: 5,
  // user: config.mongo.user,
  // pass: config.mongo.pass,
};

const connect = async () => {
  const { database, pass, user } = config.mongo;
  const url =
    `mongodb+srv://${user}:${pass}@cluster0.ndylh.mongodb.net/?retryWrites=true&w=majority&maxPoolSize=5`;
  try {
    await mongoose.connect(url, options);
    console.log('Connection to mongoose works');
  } catch (err) {
    logger.error(`Error al conectarse a la BD: ${database}`, { err: err.message });
  }
};

const disconnect = () => {
  mongoose.connection.close();
};

mongoose.connection.on('disconnected', () => logger.silly('disconnected'));
mongoose.connection.on('connected', () => logger.silly('connected'));
mongoose.connection.on('connecting', () => logger.silly('connecting'));
mongoose.connection.on('disconnecting', () => logger.silly('disconnecting'));

module.exports = { disconnect, connect };
