module.exports = (sequelize, Sequelize) => {
    const Airportgeo = sequelize.define("airport_geo", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      AIRPORTID: {
        allowNull: false,        
        type: Sequelize.CHAR
      },
      LATITUDE: {
        allowNull: false,        
        type: Sequelize.STRING
      },
      LONGITUDE: {
        allowNull: false,        
        type: Sequelize.STRING
      },
      COUNTRY: {
        allowNull: false,        
        type: Sequelize.STRING
      }
    });

    return Airportgeo;
  };

