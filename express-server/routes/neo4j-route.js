const express = require("express");
const neo4j = require("neo4j-driver");
const router = express.Router();

const driver = neo4j.driver(
  "bolt://neo4j-server",
  neo4j.auth.basic("neo4j", "admin")
);
const session = driver.session();

router.post("/neo4j/user", async (req, res) => {
  const userName = req.body.name;
  const userAge = req.body.age;

  try {
    const result = await session.run(
      "CREATE (a:Person {name: $name, age: $age}) RETURN a",
      { name: userName, age: userAge }
    );

    const singleRecord = result.records[0];
    const node = singleRecord.get(0);

    console.log(node.properties.name);
  } catch (err) {
    console.log("ERROR-INSET-NEO4J", err);
    await session.close();
  }
  // on application exit:
  // await driver.close();
  return res.json({ ok: true, data: "INSER CREADO" });
});

router.get("/neo4j/users", async (req, res) => {
  //const result = await session.run('MATCH (n:Person) RETURN n LIMIT 25');
  const json = [];
  await session
    .run("MATCH (n:Person) RETURN n LIMIT 25")
    .then((result) => {
      result.records.forEach((record) => {
        json.push(record.get("n").properties);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  //.then(() => session.close());
  return res.json({ ok: true, data: json });
});

router.get("/neo4j", (req, res) => {
  return res.send("Hola soy Neo4J!");
});

module.exports = router;
module.exports.get = async function (res) {
  const json = [];
  await session
    .run("MATCH (n:Person) RETURN n LIMIT 100")
    .then((result) => {
      result.records.forEach((record) => {
        json.push(record.get("n").properties);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return res.json({ ok: true, db: 'neo4j', data: json });
};
module.exports.post = async function (req, res) {
  const userName = req.body.name;
  const userAge = req.body.age;

  try {
    const result = await session.run(
      "CREATE (a:Person {name: $name, age: $age}) RETURN a",
      { name: userName, age: userAge }
    );

    const singleRecord = result.records[0];
    const node = singleRecord.get(0);

    //console.log(node.properties.name);
  } catch (err) {
    console.log("Neo4j: ERROR-INSET-NEO4J", err);
    await session.close();
  }
  // on application exit:
  // await driver.close();
  return res.json({ ok: true, data: "User created successfully in Neo4."});
};

module.exports.delete = async function (req, res) {
  await session
    .run("MATCH (n) DETACH DELETE n")
    .then((result) => {
      console.log('Neo4j: deleted Nodes ',result);
    })
    .catch((error) => {
      console.log(error);
    });
  return res.json({ ok: true, users: [], data: "Users deleted successfully in Neo4."});
};