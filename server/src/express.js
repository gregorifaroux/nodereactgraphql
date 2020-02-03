import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import path from 'path';
import rateLimit from 'express-rate-limit';
import { logger, requestLogger } from './logger';

const app = express();
app.use(xss());
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.2.26' }));

// Apply to all requests
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);

app.use((req, res, done) => {
  logger.info(req.originalUrl);
  done();
});
app.use(requestLogger);
app.use(express.static(path.join(__dirname, '../../client/build')));

module.exports.app = app;
