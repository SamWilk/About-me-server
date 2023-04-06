const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("../config/config");

const router = express.Router();

router.get("/githubprojects", async (req, res) => {
  const GetProjects = fs
    .readFileSync(path.join(__dirname, "../sql/GetProjects.sql"))
    .toString();
  try {
    const client = await db.connect();
    client.query(GetProjects, (err, result) => {
      if (err) {
        throw err;
      } else {
        const GetLogs = fs
          .readFileSync(path.join(__dirname, "../sql/CreateGithubLog.sql"))
          .toString();
        client.query(GetLogs, (err, result) => {
          console.log("Creating Log");
          if (err) throw err;
          console.log("Log Saved");
        });
        res.status(200).send(result.rows);
      }
    });
    client.release();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
