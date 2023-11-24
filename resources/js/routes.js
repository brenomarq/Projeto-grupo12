import express from "express";

const app = express();
app.use(express.json());

/*Rotas do post*/
app.get("/Post", (req, res) => {

});

app.post("/Post", (req, res) => {

});

app.delete("/Post", (req, res) => {

});

/*Rotas dos comentários*/
app.get("/Comment", (req, res) => {

});

app.post("/Comment", (req, res) => {

});

app.delete("/Comment", (req, res) => {

});

app.listen(3000)
