const { airportgeo } = require("../models");
const db = require("../models");
const Airportgeo = db.airportgeo;
const Joi = require('joi');

// Validation schema using Joi
const airportGeoValidationSchema = Joi.object({
  AIRPORTID: Joi.string().required(),
  COUNTRY: Joi.string().required(),
  LATITUDE: Joi.number().required(),
  LONGITUDE: Joi.number().required(),
  // Add more properties and validation as needed
});

checkDuplicateHostenameOrSerialNO = async (req, res, next) => {
  try {
    // Validate the incoming JSON data
    const { error } = airportGeoValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check for duplicate entry
    const airportgeostatus = await Airportgeo.findOne({
      where: {
        AIRPORTID: req.body.AIRPORTID,
        COUNTRY: req.body.COUNTRY,
      }
    });

    if (airportgeostatus) {
      res.status(200).send({
        message: "Updating the Airport Location Status"
      });

      // Perform the update
      await Airportgeo.update(req.body, {
        where: {
          AIRPORTID: req.body.AIRPORTID,
          COUNTRY: req.body.COUNTRY,
        }
      });

      return;
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const verifyairportgeotableentry = {
  checkDuplicateHostenameOrSerialNO: checkDuplicateHostenameOrSerialNO
};

module.exports = verifyairportgeotableentry;