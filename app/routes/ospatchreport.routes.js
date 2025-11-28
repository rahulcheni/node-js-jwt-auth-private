const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const ospatch = require("../controllers/ospatchreport.controller.js");
const verifyospatchtableentry = require("../middleware/verifyospatchtableentry.js")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    var router = require("express").Router();
  
    // add new OS patch status
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], ospatch.create);
    
  
    app.use('/api/ospatchreport', [verifyospatchtableentry.checkDuplicateHostenameOrSerialNO], router);

};
