const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

var fs = require('fs');
var multer = require('multer');

require("../models/Evento")
const Evento = mongoose.model("Eventos")
require("../models/Tema")
const Tema = mongoose.model("Temas")

router.get('/', (req, res) => {
    res.render("indexAdmin")
})

//Chama tela de adicionar um novo evento
router.get('/addevento', (req, res) => {
    res.render("formularioEvento")
})

//Adiciona ao banco de dados um novo evento, se correto
router.post('/addevento', (req, res) => {
    //req.body.

    newItem.img.contentType = 'image/png';
    newItem.save();

    const novoEvento = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        imagem: {
            path: fs.readFileSync(req.body.img.userPhoto.path),
            caption: 'image/png'
        }
    }
    console.log(req)
    new Evento(novoEvento).save().then(() => {
        console.log("Categoria salva com sucesso")
    }).catch((err) => {
        console.log("Houve um erro ao salvar o Evento: " + err)
    })

    res.redirect("/admin")
})

router.get('/editevento', (req, res) => {
    res.send("Editar Evento ")
})

router.get('/addtema', (req, res) => {
    res.render("formularioTemas")
})

router.get('/edittema', (req, res) => {
    res.send("Editar Tema")
})

router.get('/promo', (req, res) => {
    res.send("Editar promo")
})

module.exports = router;