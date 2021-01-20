const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "recipeBook",
  "postgres",
  "ryanpostgres!",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

sequelize.authenticate().then(
  function () {
    console.log("Connected to the recipeBook database.");
  },
  function (err) {
    console.log(err);
  }
);

module.exports = sequelize;
