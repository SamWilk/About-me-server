const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/config");

const PORT = process.env.SERVER_PORT || 3000;

const { networkInterfaces } = require("os");
const nets = networkInterfaces();
const results = []; // Or just '{}', an empty object

const app = express();

app.use(express.json());
app.use(cors());

const GetProjects = require("./router/getProjects");
const GetExperince = require("./router/getExperince");

app.get("/", (req, res) => res.send("About-Me-Server is running"));
app.use(GetProjects);
app.use(GetExperince);

app.listen(PORT, () => {
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results.push(net.address);
      }
    }
  }
  console.log(
    `About-me-server running on port http://${results.pop()}:${PORT}`
  );
});

module.exports = app;
