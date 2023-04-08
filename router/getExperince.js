const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("../config/config");

const router = express.Router();

router.get("/experince", async (req, res) => {
  const GetExperince = fs
    .readFileSync(path.join(__dirname, "../sql/GetExperince.sql"))
    .toString();
  try {
    const client = await db.connect();
    client.query(GetExperince, (err, result) => {
      if (err) return res.status(500);
      res.status(200).send(result.rows);
    });
    client.release();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
