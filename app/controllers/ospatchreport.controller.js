const db = require("../models");
const OSPatch = db.ospatch;
const Op = db.Sequelize.Op;

//Insert new Patch details
exports.create = (req, res) => {
    if (!req.body.HOSTNAME) {
        res.status(400).send({
        message: "Content can not be empty!"
    });
    return;
    }
    
  // Create a Patch details
  const ospatch = {
    HOSTNAME: req.body.HOSTNAME,
    DATE: req.body.DATE,
    AIRPORTID: req.body.AIRPORTID,
    SERIALNO: req.body.SERIALNO,
    JOBID: req.body.JOBID,
    LATESTINSTALLEDOSPATCH: req.body.LATESTINSTALLEDOSPATCH,
    ALLINSTALLEDOSPATCHES: req.body.ALLINSTALLEDOSPATCHES,
    BULLETIN: req.body.BULLETIN
  };

  // Save Patch details in the database
  OSPatch.create(ospatch)
    .then(data => {
      res.status(200).send({
        message: "Creating the OS Patch Status!"
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while updating OS Patch Status!."
      });
    });
};


// Retrieve all OS Patch Status
exports.findAll = (req, res) => {

  const HOSTNAME = req.query.HOSTNAME;
  var condition = HOSTNAME ? { HOSTNAME: { [Op.like]: `%${HOSTNAME}%` } } : null;

  OSPatch.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving OS Patch Status!."
      });
    });
  
};

//search a single OS Patch Status with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  OSPatch.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find OS Patch Status with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving OS Patch Status with id=" + id
      });
    });
};

// Update a OS Patch Status details by the id in the request
exports.update = (req, res) => {
  const HOSTNAME = req.params.HOSTNAME;
  const SERIALNO = req.params.SERIALNO ;

  OSPatch.update(req.body, {
    where: { HOSTNAME: HOSTNAME , SERIALNO: SERIALNO }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Successfully Updated OS Patch Status."
        });
      } else {
        res.send({
          message: `Can't update OS Patch Status with id=${id}.Something has gone wrong!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Can't update OS Patch Status with id=" + id
      });
    });
};

// remove a OS Patch Status with the given id 
exports.delete = (req, res) => {
  const id = req.params.id;

  OSPatch.destroy({
    where: { id: id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Successfully deleted OS Patch Status!"
        });
      } else {
        res.send({
          message: `Something went wrong!Can't delete OS Patch Status with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Can't delete OS Patch Status with id=" + id
      });
    });
};
