const db = require("../models");
const Airportgeo = db.airportgeo;
const Op = db.Sequelize.Op;

//Insert new Airport Location
exports.create = (req, res) => {
    if (!req.body.AIRPORTID) {
        res.status(400).send({
        message: "Content can not be empty!"
    });
    return;
    }
    
  // Create a Airport Location
  const airportgeo = {
    AIRPORTID: req.body.AIRPORTID,
    LATITUDE: req.body.LATITUDE,
    LONGITUDE: req.body.LONGITUDE,
    COUNTRY: req.body.COUNTRY
  };

  // Save Airport Location in the database
  Airportgeo.create(airportgeo)
    .then(data => {
      res.status(200).send({
        message: "Creating the Airport Location!"
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while updating Airport Location!."
      });
    });
};


// Retrieve all Airport Location
exports.findAll = (req, res) => {

  const HOSTNAME = req.query.HOSTNAME;
  var condition = HOSTNAME ? { HOSTNAME: { [Op.like]: `%${HOSTNAME}%` } } : null;

  Airportgeo.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Airport Location!."
      });
    });
  
};

//search a single Airport Location with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Airportgeo.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Airport Location with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Airport Location with id=" + id
      });
    });
};

// Update a Airport Location details by the id in the request
exports.update = (req, res) => {
  const HOSTNAME = req.params.HOSTNAME;
  const SERIALNO = req.params.SERIALNO ;

  Airportgeo.update(req.body, {
    where: { HOSTNAME: HOSTNAME , SERIALNO: SERIALNO }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Successfully Updated Airport Location."
        });
      } else {
        res.send({
          message: `Can't update Airport Location with id=${id}.Something has gone wrong!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Can't update Airport Location with id=" + id
      });
    });
};

// remove a Airport Location with the given id 
exports.delete = (req, res) => {
  const id = req.params.id;

  Airportgeo.destroy({
    where: { id: id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Successfully deleted Airport Location!"
        });
      } else {
        res.send({
          message: `Something went wrong!Can't delete Airport Location with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Can't delete Airport Location with id=" + id
      });
    });
};
