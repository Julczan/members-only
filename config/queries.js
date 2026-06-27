const pool = require("./pool");

async function saveUser({ firstName, lastName, username, hashedPassword }) {
  await pool.query(
    "INSERT INTO users (firstName, lastName, username, password, isMember) VALUES ($1, $2, $3, $4, false)",
    [firstName, lastName, username, hashedPassword],
  );
}

async function findUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows;
}

async function findUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows;
}

async function createMessage({ title, message, authorId }) {
  await pool.query(
    "INSERT INTO messages (title, message, authorId) VALUES ($1, $2, $3)",
    [title, message, authorId],
  );
}

module.exports = { saveUser, findUserByUsername, findUserById, createMessage };
