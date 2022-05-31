const express = require("express");
const router = express.Router();
const mongo = require('./mongo-route');
const redis = require('./redis-route');
const mysql = require('./mysql-route');
const neo4j = require('./neo4j-route');

router.get("/server/users/:id", async (req, res) => {
    const typeDB = req.params.id;
    console.log('Base de Datos:', typeDB);
    if(typeDB == 'mongo'){
        mongo.get(res);
    } else if (typeDB == 'redis') {
        redis.get(res);
    } else if (typeDB == 'mysql') {
        mysql.get(res);
    } else {
        neo4j.get(res);
    }
});

router.post("/server/user/:id", async (req, res) => {
    const typeDB = req.params.id;
    console.log('Base de Datos:', typeDB);
    if(typeDB == 'mongo'){
        mongo.post(req, res);
    } else if (typeDB == 'redis') {
        redis.post(req, res);
    } else if (typeDB == 'mysql') {
        mysql.post(req, res);
    } else {
        neo4j.post(req, res);
    }
});

router.delete("/server/users/:id", async (req, res) => {
    const typeDB = req.params.id;
    console.log('Base de Datos:', typeDB);
    if(typeDB == 'mongo'){
        mongo.delete(req, res);
    } else if (typeDB == 'redis') {
        redis.delete(req, res);
    } else if (typeDB == 'mysql') {
        mysql.delete(req, res);
    } else {
        neo4j.delete(req, res);
    }
    
});
router.get("/server", (req, res) => {
  return res.send("Hola soy Server Polimorfo!");
});


module.exports = router;


