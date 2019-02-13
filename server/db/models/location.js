const Sequelize = require('sequelize');
const db = require('../db');

const Location = db.define(
  'location',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lat: {
      type: Sequelize.FLOAT,
      validate: { min: -90, max: 90 },
    },
    lon: {
      type: Sequelize.FLOAT,
      validate: { min: -180, max: 180 },
    },
  },
  {
    validate: {
      bothCoordsOrNone() {
        if ((this.lat === null) !== (this.lon === null)) {
          throw new Error(
            'Require either both latitude and longitude or neither'
          );
        }
      },
    },
  }
);

module.exports = Location;
