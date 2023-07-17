const express = require('express');
const app = express();
// const router = require('../routes/index');
const router = require('../routes/userRoutes');

//Router Middlewares
app.use(express.json());

app.use('/api/v1', router);

module.exports = app;
