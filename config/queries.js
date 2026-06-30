const pool = require("./pool");

async function saveUser({ firstName, lastName, username, hashedPassword }) {
  await pool.query(
    "INSERT INTO users (firstName, lastName, username, password) VALUES ($1, $2, $3, $4)",
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
  const { rows } = await pool.query("SELECT * FROM users WHERE user_id = $1", [
    id,
  ]);
  return rows;
}

async function createMessage({ title, message, author_id }) {
  await pool.query(
    "INSERT INTO messages (title, message, author_id) VALUES ($1, $2, $3)",
    [title, message, author_id],
  );
}

async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT message_id, title, created_at, message, author_id, username FROM messages INNER JOIN users ON author_id = user_id",
  );
  return rows;
}

async function updateMembership(id) {
  await pool.query("UPDATE users SET is_member = true WHERE user_id = $1", [
    id,
  ]);
}

async function updateAdmin(id) {
  await pool.query("UPDATE users SET is_admin = true WHERE user_id = $1", [id]);
}

async function deleteMessageFromDB(id) {
  await pool.query("DELETE FROM messages WHERE message_id = $1", [id]);
}

module.exports = {
  saveUser,
  findUserByUsername,
  findUserById,
  createMessage,
  updateMembership,
  getAllMessages,
  updateAdmin,
  deleteMessageFromDB,
};
