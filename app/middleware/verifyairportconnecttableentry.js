const { airportconnect } = require("../models");
const db = require("../models");
const Airportconnect = db.airportconnect;
const Joi = require('joi');

// Validation schema using Joi
const airportConnectValidationSchema = Joi.object({
  DATE: Joi.date().required(),
  AIRPORT: Joi.string().required(),
  CLIENT_NAME: Joi.string().required(),
  CLIENT_IP: Joi.string().required(),
  CLIENT_DNS: Joi.string().required(),
  CLIENT_GATEWAY: Joi.string().required(),
  REMOTE_SERVICE_NAME: Joi.string().required(),
  CLIENT_RESOLVED_IP: Joi.string().required(),
  NIC_INTERFACE: Joi.string().required(),
  NIC_INTERFACE: Joi.string().required(),
  TEST_STATUS: Joi.string().required(),
  RTT: Joi.number().required(),
  WU_STATUS: Joi.boolean().required(),
  
  // Add more properties and validation as needed
});

checkDuplicateAirportOrServiceName = async (req, res, next) => {
  try {
    // Validate the incoming JSON data
    const { error } = airportConnectValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check for duplicate entry
    const airportconnectstatus = await Airportconnect.findOne({
      where: {
        AIRPORT: req.body.AIRPORT,
        CLIENT_NAME: req.body.CLIENT_NAME,
        REMOTE_SERVICE_NAME: req.body.REMOTE_SERVICE_NAME,
      }
    });

    if (airportconnectstatus) {
      res.status(200).send({
        message: "Updating the Airport Location Status"
      });

      // Perform the update
      await Airportconnect.update(req.body, {
        where: {
        AIRPORT: req.body.AIRPORT,
        CLIENT_NAME: req.body.CLIENT_NAME,
        REMOTE_SERVICE_NAME: req.body.REMOTE_SERVICE_NAME,

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

const verifyairportconnecttableentry = {
  checkDuplicateAirportOrServiceName: checkDuplicateAirportOrServiceName
};

module.exports = verifyairportconnecttableentry;