const Sequelize = require('sequelize');
const db = require('../database');

const Vendor = db.define('vendor', {
  contact_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  contact_phone_num: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  contact_email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  bus_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  // bus_address: {
  //   type: Sequelize.STRING,
  // },
  bus_description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  // bus_phone: {
  //   type: Sequelize.STRING,
  // },
  bus_website: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
  bus_social: {
    type: Sequelize.STRING,
  },
  // EIN: {
  //   type: Sequelize.STRING,
  // },
  // NYS_tax_id: {
  //   type: Sequelize.STRING,
  // },
  // notes: Sequelize.TEXT,
  // app_status: {
  //   type: Sequelize.ENUM('Approved', 'Undecided', 'Rejected', 'Pending'),
  // },
});

module.exports = Vendor;
