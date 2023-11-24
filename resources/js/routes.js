import express from "express";

const app = express()

app.get("/hello", callbackServido)

function callbackServido () {
    console.log("Servidor rodando na porta 3000")
}

app.listen(3000)
