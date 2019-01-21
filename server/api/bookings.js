const router = require('express').Router();
const { Event, Item, Booking } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    console.log('get single booking route is ', booking);
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { vendorId } = req.body;
    const newBooking = await Booking.create({
      booking_date: Date.now(),
      vendorId: vendorId,
    });
    res.json(newBooking);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const { id, eventName, vendorId, notes, items } = req.body;
    const event = await Event.findAll({
      where: {
        name: eventName,
      },
    });
    const booking = await Booking.findByPk(id);
    await booking.update({
      vendorId: vendorId,
      eventId: event[0].id,
      notes: notes,
      booking_date: Date.now(),
    });
    const updatedBooking = await Booking.findByPk(id);
    res.json(updatedBooking);
  } catch (err) {
    next(err);
  }
});
