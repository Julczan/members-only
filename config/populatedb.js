#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstName VARCHAR ( 255 ),
    lastName VARCHAR ( 255 ),
    username VARCHAR ( 255 ) UNIQUE,
    password VARCHAR ( 255 ),
    is_member BOOLEAN DEFAULT false,
    is_admin BOOLEAN DEFAULT false
    );
    
CREATE TABLE IF NOT EXISTS messages (
    message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 255 ),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message VARCHAR ( 255 ),
    author_id INTEGER REFERENCES users(user_id) ON DELETE RESTRICT
    );

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
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
