const router = require('express').Router();
const Hashids = require('hashids');
const hashids = new Hashids();

const { Bill, Booking, Vendor, Event, Item } = require('../db/models');

module.exports = router;

const sgMail = require('@sendgrid/mail');
router.post('/', async (req, res, next) => {
  try {
    const hashid = hashids.encode(req.body.arr);
    console.log('hashids encode 1 is ', hashid);
    console.log('sendgrid api key is ', process.env.SENDGRID_API_KEY);
    sgMail.setApiKey(
      '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'
    );
    const msg = {
      to: 'sarayoon12@gmail.com',
      from: 'boothbetter@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    await sgMail.send(msg);
    res.json(hashid);
  } catch (err) {
    next(err);
  }
});
