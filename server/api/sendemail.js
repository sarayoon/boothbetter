const router = require('express').Router();
const Hashids = require('hashids');
const hashids = new Hashids('', 30);

const { Bill, Booking, Vendor, Event, Item } = require('../db/models');

module.exports = router;

const sgMail = require('@sendgrid/mail');
router.post('/', async (req, res, next) => {
  try {
    const generatedHash = hashids.encode(req.body.arr);
    const [billId, vendorId, eventId] = req.body.arr;
    const bill = await Bill.findByPk(billId);
    const [booking] = await Booking.findAll({
      where: {
        billId: bill.id,
      },
    });
    const vendor = await Vendor.findByPk(vendorId);
    const event = await Event.findByPk(eventId);
    sgMail.setApiKey(
      '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'
    );
    const msg = {
      to: 'sarayoon12@gmail.com',
      from: 'sara@streetfairproductions.com',
      subject: 'Bill from Street Fair Productions',
      text: `View your bill here: https:/localhost:8080/viewbill/${generatedHash} `,
      html: `<html>
      <head>
        <title></title>
      </head>
      <body>
      <div style="text-align: center;"><span style="font-family:garamond,serif;"><span style="font-size:16px;"><strong>You have been booked to participate in:</strong> ${
        event.name
      }!</span></span></div>
      <div>&nbsp;</div>
      <div style="text-align: center;"><span style="font-family:garamond,serif;"><span style="font-size:16px;">Here is your bill:</span></span></div>
      <div>&nbsp;</div>
    <div style="text-align: center;"><span style="font-family:garamond,serif;"><span style="font-size:16px;"><strong>Bill # :</strong> ${
      bill.id
    }</span></span></div>

  <div style="text-align: center;"><span style="font-family:garamond,serif;"><span style="font-size:16px;"><strong>for : </strong>${
    vendor.contact_name
  }</span></span>

  <div>&nbsp;</div>
  </div>

  <div style="text-align: center;">&nbsp;</div>

  <div style="text-align: center;"><span style="font-family:garamond,serif;"><span style="font-size:16px;"><strong>from Street Fair Productions</strong></span></span></div>
  <div style="text-align: center;"><span style="font-family:garamond,serif;"><span style="font-size:16px;">Amount Due: $${
    bill.amt_owed
  }</div>
  <div style="text-align: center;"></div>
  <p></p>
  <div style="text-align: center">
  <a style="background-color:#68B3C8;border:1px solid #333333;border-color:#68B3C8;border-radius:6px;border-width:1px;color:#ffffff;display:inline-block;font-family:helvetica,arial,sans-serif;font-size:16px;font-weight:normal;letter-spacing:0px;line-height:16px;padding:12px 18px 12px 18px;text-align:center;text-decoration:none" href="http://localhost:8080/viewbill/${generatedHash}" target="_blank">View in Browser</a>
  </div>
      </body>
      </html>`,
    };
    await sgMail.send(msg);
    res.json(generatedHash);
  } catch (err) {
    next(err);
  }
});
