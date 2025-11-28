const db = require("../models");
const Jobstatus = db.jobstatus;
const Op = db.Sequelize.Op;

//Insert new Job Status
exports.create = (req, res) => {
    if (!req.body.HOSTNAME) {
        res.status(400).send({
        message: "Content can not be empty!"
    });
    return;
    }
    
  // Create a Job Status
  const jobstatus = {
    HOSTNAME: req.body.HOSTNAME,
    DATE: req.body.DATE,
    AIRPORTID: req.body.AIRPORTID,
    SERIALNO: req.body.SERIALNO,
    JOBID: req.body.JOBID,
    JOBSTATUS: req.body.JOBSTATUS,
    COMPLIANCESTATE: req.body.COMPLIANCESTATE
  };

  // Save Job Status in the database
  Jobstatus.create(jobstatus)
    .then(data => {
      res.status(200).send({
        message: "Creating the Job Status!"
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while updating Job Status!."
      });
    });
};


// Retrieve all Job Status
exports.findAll = (req, res) => {

  const HOSTNAME = req.query.HOSTNAME;
  var condition = HOSTNAME ? { HOSTNAME: { [Op.like]: `%${HOSTNAME}%` } } : null;

  Jobstatus.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Job Status!."
      });
    });
  
};

//search a single Job Status with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Jobstatus.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Job Status with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Job Status with id=" + id
      });
    });
};

// Update a Job Status details by the id in the request
exports.update = (req, res) => {
  const HOSTNAME = req.params.HOSTNAME;
  const SERIALNO = req.params.SERIALNO ;

  Jobstatus.update(req.body, {
    where: { HOSTNAME: HOSTNAME , SERIALNO: SERIALNO }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Successfully Updated Job Status."
        });
      } else {
        res.send({
          message: `Can't update Job Status with id=${id}.Something has gone wrong!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Can't update Job Status with id=" + id
      });
    });
};

// Remove a job status with the given id 
exports.delete = (req, res) => {
  const id = req.params.id;

  Jobstatus.destroy({
    where: { id: id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Successfully deleted Job Status!"
        });
      } else {
        res.send({
          message: `Something went wrong!Can't delete Job Status with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Can't delete Job Status with id=" + id
      });
    });
};
