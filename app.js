require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");

let user = require("./controllers/usercontroller");
let recipe = require("./controllers/recipecontroller");
sequelize.sync();
// sequelize.sync({force: true})

app.use(express.json());
app.use(require("./middleware/headers"));

app.use("/user", user);

app.use(require('./middleware/auth'));
app.use("/recipe", recipe);

app.listen(process.env.PORT, function () {
  console.log(`App is listening on port ${process.env.PORT}.`);
});
