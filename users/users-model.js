const db = require("../data/dbConfig");

const find = () => {
  return db("users as u").orderBy("dept").select("u.id", "u.username", "u.dept");
};

const findBy = (data) => {
  return db("users").where(data).first();
};

const add = async (data) => {
  const info = await db("users").insert(data);
  return { id: info[0], username: data.username };
};

module.exports = { find, findBy, add };
