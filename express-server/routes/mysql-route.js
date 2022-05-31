const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "mysql-server",
  user: "root",
  password: "example",
  database: "mydb"
});
// database: "mydb", // la primera vez que se ejecuta hay que comentar esta linea

//console.log('______________________________________________________________');
//console.log(connection);
console.log('______________________________________________________________');
connection.connect(function (err) {
  if (err) {
    console.error("Mysql: error connecting: " + err.stack);
    return;
  } else {
    console.log("Mysql: connected as ids: " + connection.threadId);
    connection.query("CREATE DATABASE IF NOT EXISTS mydb", function (
      err,
      result
    ) {
      if (err) throw err;
      console.log("Mysql: Database created");
    });
  }
});
router.get("/createTable", async (req, res) => {
  const sql = "CREATE TABLE usuarios (name VARCHAR(255), age int)";
  connection.query(sql, function (err, result) {
    if (err) {
      return res.json({ ok: false, error: err });
    } else {
      console.log("Mysql: Table created");
      return res.json({ ok: true });
    }
  });
});

router.post("/mysql/user", async (req, res) => {
  const userName = req.body.name;
  const userAge = req.body.age;

  //console.log("USER FRONT..............:  ", userName, "......", userAge);

  const sql = "INSERT INTO usuarios (name, age) VALUES ( '"+ userName +"', '" + userAge + "')";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("MYSQL-ERROR-INSERT:", err);
      return res.json({ ok: false, error: err });
    } else {
      console.log("INSERT created");
      return res.json({ ok: true, data: "INSER CREADO" });
    }
  });
});

router.get('/mysql/users', (req, res) => {
  const sql = "SELECT * FROM usuarios";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("MYSQL-ERROR-GET-USERS", err);
      return res.json({ ok: false, error: err });
    } else {
      return res.status(200).json({ ok: true, data: result });
    }
  });
});

router.get("/mysql", (req, res) => {
  return res.send("Hola MYSQL!");
});

module.exports = router;
module.exports.get = async function (res) { 
  const sql = "SELECT * FROM usuarios";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("Mysql: MYSQL-ERROR-GET-USERS", err);
      return res.json({ ok: false, db: 'mysql', error: err });
    } else {
      return res.status(200).json({ ok: true, db: 'mysql', data: result });
    }
  });
};

module.exports.post = async function (req, res) {
  const userName = req.body.name;
  const userAge = req.body.age;

  //console.log("USER FRONT..............:  ", userName, "......", userAge);

  const sql = "INSERT INTO usuarios (name, age) VALUES ( '"+ userName +"', '" + userAge + "')";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("Mysql: MYSQL-ERROR-INSERT:", err);
      return res.json({ ok: false, error: err });
    } else {
      console.log("Mysql: INSERT created");
      return res.json({ ok: true, data: "User created successfully in Mysql." });
    }
  });
};

module.exports.delete = async function (req, res) {
  const sql = "delete from usuarios;";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("Mysql: MYSQL-ERROR-GET-USERS", err);
      return res.json({ ok: false, db: 'mysql', error: err });
    } else {
      return res.json({ ok: true, users: [], data:"Users deleted successfully in Mysql." });
    }
  });
};