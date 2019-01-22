const router = require('express').Router();
const { Bill, Booking, Vendor, Event, Item } = require('../db/models');
const Hashids = require('hashids');
const hashids = new Hashids('', 30);
module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    console.log('req.params.id is ', req.params.id);
    const arr = hashids.decode(req.params.id);
    const billId = arr[0];
    console.log('billId is ', billId);
    const [booking] = await Booking.findAll({
      include: [
        { model: Bill, where: { id: billId } },
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
