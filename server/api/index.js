const router = require('express').Router();

// router.use('/users', require('./users'));
// router.use('/puppies', require('./puppies'));
// router.use('/kittens', require('./kittens'));

router.use('/users', require('./user'));
router.use('/vendors', require('./vendors'));
router.use('/events', require('./events'));
router.use('/bookings', require('./bookings'));
router.use('/bills', require('./bills'));
router.use('/items', require('./items'));
router.use('/sendemail', require('./sendemail'));
router.use('/viewbill', require('./viewbill'));

router.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

module.exports = router;
