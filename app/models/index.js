const config = require("../config/db.config.js");
const secureEnv = require('secure-env');
global.env = secureEnv({secret:'XZ101023FGUS'});

const Sequelize = require("sequelize");
  const sequelize = new Sequelize(config.DB, config.USER, global.env.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,
    
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.jobstatus = require("../models/jobstatus.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.ospatch = require("../models/ospatchreport.model.js")(sequelize, Sequelize);
db.airportgeo = require("../models/airportgeo.model.js")(sequelize, Sequelize);
db.airportconnect = require("../models/airportconnect.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
