const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users").insert([
    {
      username: "admin",
      password: bcrypt.hashSync("password"),
      firstName: "admin",
      lastName: "admin"
    }
  ]);
};
