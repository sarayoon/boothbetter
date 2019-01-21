const Sequelize = require('sequelize');
const db = require('../database');

const Event = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false, // built-in postgres validation
    validate: {
      notEmpty: true, //limitation on when it's created in sequelize, blocks it before it enters the database
    },
  },
  start_date: {
    type: Sequelize.DATEONLY,
  },
  end_date: {
    type: Sequelize.DATEONLY,
  },
  description: {
    type: Sequelize.TEXT,
  },
  // notes: Sequelize.TEXT,
  // category: Sequelize.TEXT,
});

module.exports = Event;
