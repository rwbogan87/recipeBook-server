const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "recipeBook",
  "postgres",
  "ryanpostgres!",
  {
    host: "localhost",
    dialect: "postgres",
    // heroku stuff

    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false
    //   }
    // }
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
