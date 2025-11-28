const db = require("../models");
const Airportconnect = db.airportconnect;
const Op = db.Sequelize.Op;

//Insert new Airport Connection details
exports.create = (req, res) => {
    if (!req.body.AIRPORT) {
        res.status(400).send({
        message: "Content can not be empty!"
    });
    return;
    }
    
  // Create a Airport Connection details
  const airportconnect = {
    AIRPORT: req.body.AIRPORT,
    CLIENT_NAME: req.body.CLIENT_NAME,
    CLIENT_IP: req.body.CLIENT_IP,
    CLIENT_DNS: req.body.CLIENT_DNS,
    CLIENT_GATEWAY: req.body.CLIENT_GATEWAY,
    REMOTE_SERVICE_NAME: req.body.REMOTE_SERVICE_NAME,
    CLIENT_RESOLVED_IP: req.body.CLIENT_RESOLVED_IP,
    NIC_INTERFACE: req.body.NIC_INTERFACE,
    TEST_STATUS: req.body.TEST_STATUS,
    RTT: req.body.RTT,
    WU_STATUS: req.body.WU_STATUS            
  };

  // Save Airport Connection details in the database
  Airportconnect.create(airportconnect)
    .then(data => {
      res.status(200).send({
        message: "Creating the Airport Connection Status!"
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while updating Airport Connection Status!."
      });
    });
};


// Retrieve all Airport Connection Status
exports.findAll = (req, res) => {

  const AIRPORT = req.query.AIRPORT;
  var condition = AIRPORT ? { AIRPORT: { [Op.like]: `%${AIRPORT}%` } } : null;

  Airportconnect.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Airport Connection Status!."
      });
    });
  
};

//search a single Airport Connection Status with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Airportconnect.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Airport Connection Status with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Airport Connection Status with id=" + id
      });
    });
};

// Update a Airport Connection Status details by the id in the request
exports.update = (req, res) => {
  const AIRPORT = req.params.AIRPORT;
  const CLIENT_NAME = req.params.CLIENT_NAME ;

  Airportconnect.update(req.body, {
    where: { AIRPORT: AIRPORT , CLIENT_NAME: CLIENT_NAME }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Successfully Updated Airport Connection Status."
        });
      } else {
        res.send({
          message: `Can't update Airport Connection Status with id=${id}.Something has gone wrong!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Can't update Airport Connection Status with id=" + id
      });
    });
};

// remove a Airport Connection Status with the given id 
exports.delete = (req, res) => {
  const id = req.params.id;

  Airportconnect.destroy({
    where: { id: id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Successfully deleted Airport Connection Status!"
        });
      } else {
        res.send({
          message: `Something went wrong!Can't delete Airport Connection Status with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Can't delete Airport Connection Status with id=" + id
      });
    });
};
