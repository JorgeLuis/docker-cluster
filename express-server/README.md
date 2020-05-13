# Server en express con Mongo y Redis

El servidor exponen los siguientes endpoints para Mongo:

```
router.get('/', (req, res) => {
    .....
});

router.get('/users', (req, res) => {
    .....
});

router.get('/users/:id', (req, res) => {
    .....
});

router.post('/users', (req, res) => {
    .....
});
```


El servidor exponen los siguientes endpoints para Redis:

```
router.get("/redis/set/:key", async (req, res) => {
    .....
});

router.get("/redis/get/:key", async (req, res) => {
    .....
});

router.get("/redis", (req, res) => {
    .....
});
```


