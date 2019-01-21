const Sequelize = require('sequelize');
const db = require('../database');

const Bill = db.define('bill', {
  bill_date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  bill_due_date: Sequelize.DATE,
  amt_owed: {
    type: Sequelize.INTEGER,
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
});

module.exports = Bill;
