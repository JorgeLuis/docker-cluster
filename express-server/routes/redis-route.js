const express = require("express");
const router = express.Router();
const redisClient = require("../redis-client");

router.post("/redis/user", async (req, res) => {
  const userName = req.body.name;
  const userAge = req.body.age;
  await redisClient.setAsync(userName, JSON.stringify(userAge));
  return res.json({ ok: true, data: "Registro Creado en REDIS" });
});

router.get("/redis/set/:key", async (req, res) => {
  const { key } = req.params;
  const value = req.query;
  await redisClient.setAsync(key, JSON.stringify(value));
  return res.json({
    ok: true,
  });
});

router.get("/redis/get/:key", async (req, res) => {
  const { key } = req.params;
  const rawData = await redisClient.getAsync(key);
  return res.json(JSON.parse(rawData));
});

const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

router.get("/redis/users", async (req, res) => {
  let redisValues = [];
  const keyArray = await redisClient.keysAsync("*");

  await asyncForEach(keyArray, async (key) => {
    await waitFor(50);
    const value = await redisClient.getAsync(key);

    const json = JSON.parse(value);
    const front = {
      name: key,
      age: json[key],
    };
    redisValues.push(front);
  });

  return res.status(200).json({ ok: true, data: redisValues });
});

router.get("/redis", (req, res) => {
  return res.send("Hola soy Redis");
});

module.exports = router;
module.exports.get = async function (res) {
  let redisValues = [];
  const keyArray = await redisClient.keysAsync("*");

  await asyncForEach(keyArray, async (key) => {
    await waitFor(50);
    const value = await redisClient.getAsync(key);

    const json = JSON.parse(value);
    const front = {
      name: key,
      age: json[key],
    };
    redisValues.push(front);
  });

  return res.status(200).json({ ok: true, db: 'redis',data: redisValues });
};

module.exports.post = async function (req, res) {
  const key = req.body.name;
  const data = `{"${key}": "${req.body.age}"}`;
  await redisClient.setAsync(key, data);
  return res.json({ ok: true, data: "User created successfully in Redis." });
};
module.exports.delete = async function (req, res) {
  await redisClient.deleteAsync();
  return res.json({ ok: true, users: [], data:"Users delete successfully in Redis." });
};