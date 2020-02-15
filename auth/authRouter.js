const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/usersHelper");
const registerMiddleware = require("./registeredMiddleware");
const generateToken = require("./tokenMiddleware");

router.post(
  "/register",
  registerMiddleware.validateUniqueUsername,
  (req, res) => {
    let user = req.body;

    if (!user) {
      return res.status(400).json({ message: "You need to register" });
    }

    if (!user.firstName && !user.lastName) {
      console.log("First and last");
      return res
        .status(400)
        .json({ message: `Your first and last name is required to register` });
    }

    if (!user.username) {
      return res
        .status(400)
        .json({ message: `You need a user name to register` });
    }

    if (!user.password) {
      return res
        .status(400)
        .json({ message: `You need a password to register` });
    }

    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.addUser(user)
      .then(user => {
        res.status(201).json({ message: `User ${user.username} created!` });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({ message: `Could not add this user` });
      });
  }
);

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .then(users => {
      if (users.length === 0) {
        return res.status(404).json({
          message: `${username} is not registered user`
        });
      }

      const user = users[0];
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken({ user });
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        return res.status(401).json({ message: "Incorrect password" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
