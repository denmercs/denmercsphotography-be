exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    // primary key
    users.increments();
    //username
    users
      .string("username", 255)
      .notNullable()
      .unique();

    //first name
    users.string("firstName", 255);

    //last name
    users.string("lastName", 255);

    //password
    users.string("password", 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
