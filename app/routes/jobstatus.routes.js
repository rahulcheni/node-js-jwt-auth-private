const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const jobstatus = require("../controllers/jobstatus.controller.js");
const verifyjobstatustableentry = require("../middleware/verifyjobstatustableentry.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    var router = require("express").Router();
  
    // add new jobstatus
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], jobstatus.create);
 
    app.use('/api/jobstatus', [verifyjobstatustableentry.checkDuplicateHostenameOrSerialNO], router);

};
