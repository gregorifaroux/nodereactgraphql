// db.js
import mongoose from 'mongoose';
import { logger } from './logger';
import dotenv from 'dotenv';
dotenv.config();

mongoose.Promise = global.Promise;

// Connect to Mongoose and set connection variable
if (!process.env.MONGODB_URI) {
  logger.error(
    'Please set a mongodb connection string eMONGODB_URI in .env file',
  );
  process.exit(1);
}

const connection = mongoose.connect(process.env.MONGODB_URI, {
  autoIndex: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 50,
  bufferMaxEntries: 0,
  keepAlive: 120,
  useNewUrlParser: true,
});

mongoose.set('useCreateIndex', true);

connection
  .then((db) => db)
  .catch((err) => {
    console.log(err);
  });

module.exports.dbConnection = connection;
