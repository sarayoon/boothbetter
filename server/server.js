const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('cookie-session');
const db = require('./db/database');

app.use(
  session({
    name: 'session',
    keys: ['s0o4h1y3u9n0', '0n9u3y1h4o0s'],
    cookie: {
      secure: false,
      httpOnly: true,
      //domain: 'boothbetter.com'
      //path: 'foo/bar'
      maxAge: 24 * 60 * 60 * 1000, // 24 hrs
    },
  })
);

app.use(morgan('dev'));
app.use(helmet());
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));
// app.use('/auth', require('./auth'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
