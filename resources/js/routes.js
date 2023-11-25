import express from "express";
const prisma = require('../services/prisma.js');
const router = express.Router();


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

/*Rotas dos cadastro*/
app.get("/Cadastro", (req, res) => {
    res.render('cadastro')
});

router.post("/Cadastro", (req, res) => {
    try {
         prisma.user.create({
            data: {
                email: req.body.email,
                username: req.body.username,
                senha: req.body.password,
                gender: req.body.genero,
                cargo: req.body.cargo,
                profilePicture: req.body.pfpPath,
            },
        });
    } catch (e) {
        return next(e);
    }

    res.redirect('/login');
});


/*Rotas dos login*/
app.get("/Login", (req, res) => {
    res.render('login')
});

app.post("/Cadastro", (req, res) => {

});

/*Rotas dos login*/
app.get("/Recuperao", (req, res) => {
    res.render('recuperacao')
});

app.post("/Cadastro", (req, res) => {

});





app.listen(3000)
