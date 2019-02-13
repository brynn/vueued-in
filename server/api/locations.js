const router = require('express').Router();
const { Location } = require('../db/models');
module.exports = router;

//////////////////////////////
//// LOCATION API ROUTES ////
////////////////////////////

// POST a new location: /api/locations
router.post('/', async (req, res, next) => {
  try {
    const name = req.body.name;
    const lat = req.body.lat;
    const lon = req.body.lon;
    const [location] = await Location.findOrCreate({
      where: {
        name,
        lat,
        lon,
      },
    });
    res.json(location.id);
  } catch (err) {
    next(err);
  }
});
