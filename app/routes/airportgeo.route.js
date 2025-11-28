const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const airportgeo = require("../controllers/airportgeo.controller.js");
const verifyairportgeotableentry = require("../middleware/verifyairportgeotableentry.js")


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    var router = require("express").Router();
  
    // add new Airport Location
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], airportgeo.create);
    
    app.use('/api/airportgeo', [verifyairportgeotableentry.checkDuplicateHostenameOrSerialNO], router);

};
