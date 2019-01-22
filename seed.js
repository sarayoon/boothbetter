const db = require('./server/db/database');
const { User, Company, Vendor, Market, Event } = require('./server/db/models/');
const vendors = require('./data/vendors.json');
const events = require('./data/events.json');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const seed = async () => {
  try {
    await db.sync({ force: true });
    const company = await Company.create({
      name: 'Street Fair Productions',
      address: '630 9th Ave #417, New York, NY 10036',
      phone_num: '(646) 230-0047',
    });
    bcrypt.hash('sara', saltRounds, async (err, hash) => {
      await User.create({
        email: 'sara@streetfairproductions.com',
        password: hash,
        phone_num: '(917) 698-1515',
        main_contact: true,
        companyId: company.id,
      });
      await Promise.all(
        vendors.map(async elem => {
          const vendor = await Vendor.create(elem);
          await vendor.setCompany(company);
        })
      );
      const market = await Market.create({
        name: 'Market In Every Location',
        address: 'All over the country',
        description: 'For test purposes, locations in the USA',
      });
      await Promise.all(
        events.map(async elem => {
          const event = await Event.create({
            name: elem.name.text,
            start_date: elem.start.local.slice(0, 10),
            end_date: elem.end.local.slice(0, 10),
            description: elem.description.text,
          });
          await event.setMarket(market);
        })
      );
      console.log('Seed success!');
      db.close();
    });
  } catch (err) {
    console.error(`Error seeding!`);
    console.error(err.stack);
    db.close();
  }
};

seed();
