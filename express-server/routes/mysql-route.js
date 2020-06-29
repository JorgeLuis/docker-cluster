const express = require('express');
const router = express.Router();
const mysql      = require('mysql');

const connection = mysql.createConnection({
  host: 'mysql-server',
  user     : 'root',
  password : 'example',
  database : 'mydb'
});
 
/* console.log('______________________________________________________________');
console.log(connection);
console.log('______________________________________________________________'); */
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  } else {
    console.log('connected as ids: ' + connection.threadId);
    connection.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  }
 
  
});
router.get("/createTable", async (req, res) => {
  const sql = "CREATE TABLE demo (name VARCHAR(255), address VARCHAR(255))";
  connection.query(sql, function (err, result) {
    if (err) {
      return res.json({ok: false, error: err});
    } else {
      console.log("Table created");
      return res.json({ok: true});
    }
  });
});

router.get("/insertPeole", async (req, res) => {
  const sql = "INSERT INTO customers (name, address) VALUES ('Jorge Luis', '31')";
  connection.query(sql, function (err, result) {
    if (err) {
      return res.json({ok: false, error: err});
    } else {
      console.log("INSERT created");
      return res.json({ok: true, data: 'INSER CREADO' });
    }
  });
});

router.get("/mysql", (req, res) => {
    return res.send("Hola MYSQL!");
  });



module.exports = router;