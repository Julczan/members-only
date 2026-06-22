#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstName VARCHAR ( 255 ),
    lastName VARCHAR ( 255 ),
    username VARCHAR ( 255 ) UNIQUE,
    password VARCHAR ( 255 ),
    isMember BOOLEAN
    );
    
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 255 ),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message VARCHAR ( 255 ),
    authorId INTEGER REFERENCES users(id) ON DELETE RESTRICT
    );
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
