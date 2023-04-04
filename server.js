const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/config");

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

const first = require("./router/getProjects");

app.get("/", (req, res) => res.send("Node App is running"));
app.use("/", first);

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connected");
});

global.db = db;

app.listen(PORT, () => console.log(`About-me-server running on port ${PORT}`));

module.exports = app;
