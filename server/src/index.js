import dotenv from 'dotenv';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { logger } from './logger';
import { dbConnection } from './db';
import { app } from './express';

import schema from './schema';

dotenv.config();

// Server
const apollo = new ApolloServer({
  schema,
  cors: true,
  playground: process.env.NODE_ENV === 'development' ? true : false,
  introspection: true,
  validationRules: [depthLimit(3)],
  tracing: false,
  path: '/',
});

// Check for DB connection
if (!dbConnection) logger.error('Error connecting db');
else logger.info('Db connected successfully');

apollo.applyMiddleware({
  app,
  path: '/',
  cors: true,
  onHealthCheck: () =>
    // eslint-disable-next-line no-undef
    new Promise((resolve, reject) => {
      if (dbConnection.readyState > 0) {
        resolve();
      } else {
        reject();
      }
    }),
});

// https
const port = process.env.PORT || 5000;
const server = http.createServer({}, app);

server.listen(port, () => {
  logger.info(`🚀 Server listening on port  ${server.address().port}`);
});
