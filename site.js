const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser")

const admin = require("./routes/admin")
const eventos = require("./routes/eventos")
const promo = require("./routes/promo")
const temas = require("./routes/temas")

const mongoose = require('mongoose');
require("./models/Evento")
const Evento = mongoose.model("Eventos")


const path = require("path")

const app = express();

//Config
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

//Rotas
app.use("/admin", admin)
app.use("/eventos", eventos)
app.use("/promo", promo)
app.use("/temas", temas)

app.listen(8081, function () {
    console.log("Servidor online rodando na porta: 8081");
});