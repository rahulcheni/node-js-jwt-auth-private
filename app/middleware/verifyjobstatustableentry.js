const { jobstatus } = require("../models");
const db = require("../models");
const Jobstatus = db.jobstatus;
const Joi = require('joi');

// Validation schema using Joi
const jobStatusValidationSchema = Joi.object({
  DATE: Joi.date().required(),
  HOSTNAME: Joi.string().required(),
  AIRPORTID: Joi.string().required(),
  SERIALNO: Joi.string().required(),
  JOBID: Joi.string().required(),
  JOBSTATUS: Joi.string().required(),
  COMPLIANCESTATE: Joi.string().required(),  
  // Add more properties and validation as needed
});

checkDuplicateHostenameOrSerialNO = async (req, res, next) => {
  try {
    // Validate the incoming JSON data
    const { error } = jobStatusValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check for duplicate entry
    const jobstatus = await Jobstatus.findOne({
      where: {
        HOSTNAME: req.body.HOSTNAME,
        SERIALNO: req.body.SERIALNO,
        JOBID: req.body.JOBID

      }
    });

    if (jobstatus) {
      res.status(200).send({
        message: "Updating the Airport Location Status"
      });

      // Perform the update
      await Jobstatus.update(req.body, {
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

const verifyjobstatustableentry = {
  checkDuplicateHostenameOrSerialNO: checkDuplicateHostenameOrSerialNO
};

module.exports = verifyjobstatustableentry;
