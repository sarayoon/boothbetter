const router = require('express').Router();
const { Vendor } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const vendors = await Vendor.findAll();
    res.json(vendors);
  } catch (err) {
    next(err);
  }
});

router.get('/:vendorId', async (req, res, next) => {
  try {
    const vendor = await Vendor.findByPk(req.params.vendorId);
    res.json(vendor);
  } catch (err) {
    next(err);
  }
});
