const router = require('express').Router();
const { Bill, Booking, Vendor, Event, Item } = require('../db/models');
const Hashids = require('hashids');
const hashids = new Hashids('', 30);
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const bills = await Bill.findAll();
    res.json(bills);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [booking] = await Booking.findAll({
      include: [
        { model: Bill, where: { id: req.params.id } },
        {
          model: Vendor,
          attributes: [
            'id',
            'contact_name',
            'contact_phone_num',
            'contact_email',
            'bus_name',
          ],
        },
        {
          model: Event,
          attributes: ['id', 'name', 'start_date', 'end_date'],
        },
        { model: Item },
      ],
    });
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    const bill = await Bill.create({
      bill_date: Date.now(),
    });
    const bookingToUpdate = await Booking.findById(bookingId);
    await bookingToUpdate.setBill(bill);
    res.json(bill);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const { billingDetails } = req.body;
    const id = billingDetails[0];
    const amt = billingDetails[1];
    const bill = await Bill.findByPk(id);
    await bill.update({
      bill_date: Date.now(),
      // bill_due_date,
      amt_owed: amt,
    });
    const updatedBill = await Bill.findByPk(id);
    console.log('updatedBill is ', updatedBill);
    res.json(updatedBill);
  } catch (err) {
    next(err);
  }
});
