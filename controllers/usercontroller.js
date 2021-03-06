let router = require("express").Router(); //here
let User = require("../db").import("../models/user"); //here
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/create", (req, res) => {
  User.create({
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 10),
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.post("/login", (req, res) => {
  User.findOne({ where: { email: req.body.user.email } })
    .then((user) => {
      if (user === null) {
        return res.status(404).json({ message: "User not found" });
      }
      bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
        if (matches) {
          const token = jwt.sign({ id: user.id }, "I am a secret", {
            expiresIn: 60 * 60 * 24,
          });
          return res.status(200).json({ user, token });
        } else {
          return res.status(401).json({ message: "Wrong password" });
        }
      });
    })
    .catch((error) => res.status(500).json(error));
});

module.exports = router;