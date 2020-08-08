exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "admin",
          password: "$2a$10$kKKkaXRjfuhMjmmqMSXFMOTdkjlJZGWnCCRE.soDQDpi7YLy6lZdK",
          dept: "tech",
        },
        {
          id: 2,
          username: "test",
          password: "$2a$10$vva0rrvgL6zQJtENjuCbLOu8eYpnKOTYg/6jZDbO7sUzDuq8ITifO",
          dept: "mktg",
        },
      ]);
    });
};
