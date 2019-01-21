const router = require('express').Router();
const { Event, Item, Booking } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { items, bookingId } = req.body;
    const newItems = await Promise.all(
      items.map(async elem => {
        if (elem.name) {
          return await Item.create({
            name: elem.name,
            price: elem.price,
            quantity: elem.quantity,
            bookingId: bookingId,
          });
        }
        // todo: handle if elem.name is false
      })
    );
    console.log('items from post items route promise all is ', newItems);
    res.json(newItems);
  } catch (err) {
    next(err);
  }
});
