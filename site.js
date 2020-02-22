const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser")

const cookieParser = require('cookie-parser')
const session = require("express-session")
const flash = require("connect-flash")

const admin = require("./routes/admin")
const eventos = require("./routes/eventos")
const promo = require("./routes/promo")
const temas = require("./routes/temas")


const mongoose = require('mongoose');

const path = require("path")

const app = express();

//Config
//Sessao
app.use(session({
    secret: "testequalquer",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

app.use(function (req, res, next) {
    // if there's a flash message in the session request, make it available 
    //in the response, then delete it
    //res.locals.sucess_mgs = req.session.sucess_mgs;
    //delete req.session.sucess_mgs;
    next();
});


//Template engine
app.engine('handlebars', handlebars({ defaulLayout: 'main' }))
app.set('view engine', 'handlebars')
//Body-Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//public
app.use(express.static(path.join(__dirname, "public")))
//database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/siteparque').then(() => {
    console.log("Conectado ao banco de dados: siteparque com sucesso")
}).catch((erro) => {
    console.log("Erro ao se conectar ao banco de dados: " + erro)
})
//Mensagens Dinamicas


//Rotas
app.use("/admin", admin)
app.use("/eventos", eventos)
app.use("/promo", promo)
app.use("/temas", temas)

app.listen(8081, function () {
    console.log("Servidor online rodando na porta: 8081");
});