const express = require("express");
const app = express();
const PUERTO = 8080;

const logger = require("./utils/logger.js");

app.use((req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
});

app.get("/saludos", (req, res) => {
    res.send("Buenassss!");
});

// Endpoint para probar los logs
app.get("/loggerTest", (req, res) => {
    req.logger.error("Vamos a morir");
    req.logger.warning("Cuidado! casiiiiii!");
    req.logger.info("Estamos navegando la app vivos");

    res.send("Logs generados!");
});

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});

app.get("/operacionsimple", (req, res) => {
    let suma = 0;
    for (let i = 0; i < 10000000; i++) {
        suma += i;
    }

    res.send({ suma });
});

app.get("/operacioncompleja", (req, res) => {
    let suma = 0;
    for (let i = 0; i < 5e8; i++) {
        suma += i;
    }

    res.send({ suma });
});