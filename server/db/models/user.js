const Sequelize = require('sequelize');
const db = require('../database');
const bcrypt = require('bcrypt');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      // added from https://medium.com/@mridu.sh92/a-quick-guide-for-authentication-using-bcrypt-on-express-nodejs-1d8791bb418f
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true, // added from medium article above ^
    len: [2, 10], // added from medium article
  },
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  phone_num: Sequelize.STRING,
  main_contact: {
    type: Sequelize.BOOLEAN,
  },
});

User.generateHash = async password => {
  return bcrypt.hash(password, bcrypt.genSalt(10), null);
};

User.prototype.validPassword = async password => {
  return bcrypt.compare(password, this.localPassword);
};

module.exports = User;
