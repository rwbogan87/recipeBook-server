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
app.use("/recipe", recipe);

app.listen(3000, function () {
  console.log("App is listening on port 3000");
});
