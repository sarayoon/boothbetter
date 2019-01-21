// entry point for our node process

const { db } = require('./db/models');
const app = require('./server');
require('babel-polyfill');

const port = process.env.PORT || 3000;

db.sync().then(() => {
  //{ force: true }
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
