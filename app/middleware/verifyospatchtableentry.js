const { ospatch } = require("../models");
const db = require("../models");
const OSpatch = db.ospatch;
const Joi = require('joi');

// Validation schema using Joi
const OSPatchValidationSchema = Joi.object({
  DATE: Joi.date().required(),
  HOSTNAME: Joi.string().required(),
  AIRPORTID: Joi.string().required(),
  SERIALNO: Joi.string().required(),
  JOBID: Joi.string().required(),
  LATESTINSTALLEDOSPATCH: Joi.string().required(),  
  ALLINSTALLEDOSPATCHES: Joi.string().required(),
  BULLETIN: Joi.string().required(),  
  // Add more properties and validation as needed
});

checkDuplicateHostenameOrSerialNO = async (req, res, next) => {
  try {
    // Validate the incoming JSON data
    const { error } = OSPatchValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check for duplicate entry
    const ospatch = await OSpatch.findOne({
      where: {
        HOSTNAME: req.body.HOSTNAME,
        SERIALNO: req.body.SERIALNO,
        JOBID: req.body.JOBID

      }
    });

    if (ospatch) {
      res.status(200).send({
        message: "Updating the Airport Location Status"
      });

      // Perform the update
      await OSpatch.update(req.body, {
        where: {
        HOSTNAME: req.body.HOSTNAME,
        SERIALNO: req.body.SERIALNO,
        JOBID: req.body.JOBID
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

const verifyospatchtableentry = {
  checkDuplicateHostenameOrSerialNO: checkDuplicateHostenameOrSerialNO
};

module.exports = verifyospatchtableentry;
