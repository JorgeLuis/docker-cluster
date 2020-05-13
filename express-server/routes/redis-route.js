const express = require('express');
const router = express.Router();
const redisClient = require("../redis-client");

router.get("/redis/set/:key", async (req, res) => {
  const { key } = req.params;
  const value = req.query;
  await redisClient.setAsync(key, JSON.stringify(value));
  return res.json({
    ok: true
  });
});

router.get("/redis/get/:key", async (req, res) => {
  const { key } = req.params;
  const rawData = await redisClient.getAsync(key);
  return res.json(JSON.parse(rawData));
});

router.get("/redis", (req, res) => {
  return res.send("Hola soy Redis");
});



module.exports = router;