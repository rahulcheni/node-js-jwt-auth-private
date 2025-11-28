module.exports = (sequelize, Sequelize) => {
    const Airportconnect = sequelize.define("airport_connect", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      AIRPORT: {
        type: Sequelize.CHAR
      },	  
      CLIENT_NAME: {
        type: Sequelize.STRING
      },
      CLIENT_IP:{
        type: Sequelize.STRING(45),
        allowNull: false
      },
      CLIENT_DNS: {
        type: Sequelize.STRING(45)
      },
      CLIENT_GATEWAY: {
        type: Sequelize.STRING(45)
      },
      REMOTE_SERVICE_NAME: {
        type: Sequelize.STRING
      },
      CLIENT_RESOLVED_IP: {
        type: Sequelize.STRING(45)
      },
      NIC_INTERFACE: {
        type: Sequelize.STRING
      },
      TEST_STATUS: {
        type: Sequelize.STRING
      },
      RTT: {
        type: Sequelize.STRING
      },
      WU_STATUS: {
        type: Sequelize.STRING
      }
    });

    return Airportconnect;
  };