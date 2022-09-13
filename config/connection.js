const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}
sequelize
  .query("SET FOREIGN_KEY_CHECKS = 0")
  .then(function () {
    return db.sync({ force: true });
  })
  .then(function () {
    return db.query("SET FOREIGN_KEY_CHECKS = 1");
  })
  .then(
    function () {
      console.log("Database synchronised.");
    },
    function (err) {
      console.log(err);
    }
  );

module.exports = sequelize;
