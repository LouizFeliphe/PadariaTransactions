//const express = require('express');
import express from "express";
import dotenv from "dotenv";
import rateLimiterFunction from "./middleware/rateLimiter.js";
dotenv.config();
import rotaTransacoes from "./routes/rotasTransacoes.js"
import { initDB } from "./config/db.js";

const PORT = process.env.PORT || 5001;
const app = express();

//Middlewares
app.use(express.json());
// Middleware de rate limiting
app.use(rateLimiterFunction);
//Middleware de rotas
app.use("/api/transactions", rotaTransacoes)
// Middleware de tratamento de erro
app.use((err, req, res, next) => {
  console.error("Erro capturado:", err.message);
  res.status(403).send(err.message);
});

//iniciar o servidor
initDB().then(() => {
    console.log(PORT);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
