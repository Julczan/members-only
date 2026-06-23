const pool = require("./pool");

async function saveUser({ firstName, lastName, username, hashedPassword }) {
  await pool.query(
    "INSERT INTO users (firstName, lastName, username, password, isMember) VALUES ($1, $2, $3, $4, false)",
    [firstName, lastName, username, hashedPassword],
  );
}

module.exports = { saveUser };
