const Sequelize = require('sequelize');
const db = require('../database');

const Booking = db.define('booking', {
  booking_date: {
    type: Sequelize.DATE,
    allowNull: false, // built-in postgres validation
    validate: {
      notEmpty: true, //limitation on when it's created in sequelize, blocks it before it enters the database
    },
  },
  notes: Sequelize.TEXT,
});

module.exports = Booking;
