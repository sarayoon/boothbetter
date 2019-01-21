const db = require('../database');
const Booking = require('./booking');
const Company = require('./company');
const Event = require('./event');
const Bill = require('./bill');
const Item = require('./item');
const Market = require('./market');
const Payment = require('./payment');
const User = require('./user');
const Vendor = require('./vendor');

Company.hasMany(User);
User.belongsTo(Company);

Company.hasMany(Vendor);
Vendor.belongsTo(Company);

Company.hasMany(Market);
Market.belongsTo(Company);

Market.hasMany(Event);
Event.belongsTo(Market);

Vendor.hasMany(Booking);
Booking.belongsTo(Vendor);

Event.hasMany(Booking);
Booking.belongsTo(Event);

Bill.hasMany(Booking);
Booking.belongsTo(Bill);

Booking.hasMany(Item);
Item.belongsTo(Booking);

Bill.hasMany(Payment);
Payment.belongsTo(Bill);

module.exports = {
  db,
  Booking,
  Company,
  Event,
  Bill,
  Item,
  Market,
  Payment,
  User,
  Vendor,
};
