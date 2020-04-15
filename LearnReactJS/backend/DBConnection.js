const Sequelize = require("sequelize");
let db = require("./settings/db");
let accountSettings = require("./settings/settings");

exports.MySQLConnection = callback => {
  const sequelize = new Sequelize(
    db.database,
    db.user,
    db.password,
    accountSettings
  );
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
      callback(sequelize);
    })
    .catch(err => {
      console.error("Unable to connect to the database: " + err);
    });
};
