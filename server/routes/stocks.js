const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createPool({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

const Trade = {
  getTrades: function (callback) {
    return db.query("SELECT entryText, entryTime, entryPrice, exitTime, exitPrice FROM juno2 WHERE entryTime >= '2018-07-07 00:00:00'", callback);
  }
};

router.get('/', function(req, res, next) {
  Trade.getTrades(function(err, rows) {
    if(err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});

module.exports = router;
