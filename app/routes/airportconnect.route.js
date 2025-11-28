const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const airportconnect = require("../controllers/airportconnect.controller.js");
const verifyairportconnecttableentry = require("../middleware/verifyairportconnecttableentry.js");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    var router = require("express").Router();
  
    // add new Airport Connection status
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], airportconnect.create);
    
  
    app.use('/api/airportconnection', [verifyairportconnecttableentry.checkDuplicateAirportOrServiceName], router);

};
