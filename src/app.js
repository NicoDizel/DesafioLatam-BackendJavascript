const express = require('express');
const routes = require('./routes/index.js');
const app = express();
const { PORT } = require("./config/appConfig.js")

app.use(express.json());

// Middlewares for formatting
app.use((req, res, next) => {
    console.log(`Request to URL: ${req.url}`);
    next();
});

app.use("/api", routes);
app.listen(PORT, console.log('Servidor encendido'));

module.exports = app;