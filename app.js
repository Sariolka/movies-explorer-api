require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/rateLimiter');
const router = require('./routes');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/bitfilmsdb' } =
  process.env;
const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: [
      'https://api.sariola.diploma.nomoreparties.co',
      'http://api.sariola.diploma.nomoreparties.co',
      'https://sariola.diploma.nomoreparties.co',
      'http://sariola.diploma.nomoreparties.co',
      'localhost:3000',
      'http://localhost:3000',
      'https://localhost:3000',
      'https://localhost:3001',
      'http://localhost:3001',
      'localhost:3001',
    ],
  })
);
app.use(requestLogger);

app.use(helmet());
app.use(limiter);
mongoose.connect(DB_URL, { family: 4 });

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту!`);
});
