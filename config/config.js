const { Pool } = require("pg");
require("dotenv").config();

// Create a connection pool using the connection information provided on bit.io.
const db = new Pool({
  user: process.env.DB_USER,
  host: "db.bit.io",
  database: process.env.DB_NAME, // public database
  password: process.env.DB_KEY, // key from bit.io database page connect menu
  port: process.env.DB_PORT,
  ssl: true,
});

module.exports = db;
