const db = require("../data/dbConfig");

function findUser(username) {
  return db("users").where(username);
}

function findUserId(id) {
  return db("users")
    .where({ id })
    .first();
}

function findBy(filter) {
  return db("users").where(filter);
}

function addUser(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findUserId(id).select("id", "username", "lastName", "firstName");
    });
}

function getUser(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findUserId(id).select("id", "username", "firstName", "lastName");
    });
}

module.exports = {
  findUser,
  findUserId,
  findBy,
  addUser,
  getUser
};
