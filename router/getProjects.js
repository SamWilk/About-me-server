const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("../config/config");

const router = express.Router();

router.get("/githubprojects", async (req, res) => {
  const GetDate = fs
    .readFileSync(path.join(__dirname, "../sql/GetProjects.sql"))
    .toString();
  await db.query(GetDate, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(result.rows);
    }
  });
});

module.exports = router;
