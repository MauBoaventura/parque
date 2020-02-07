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
    res.render("formularioEventoAdd")
})
//Adiciona ao banco de dados um novo evento, se correto
router.post('/addevento', (req, res) => {
    const novoEvento = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        imagem: {
            path: "",//fs.readFileSync(req.body.img.userPhoto.path),
            caption: ""//'image/png'
        }
    }
    new Evento(novoEvento).save().then(() => {
        console.log("Evento salvo com sucesso")
    }).catch((err) => {
        console.log("Houve um erro ao salvar o Evento: " + err)
    })

    res.redirect("/admin")
})

//Listar todos os eventos do banco de dados
router.get('/editevento', (req, res) => {
    Evento.find().then((eventos) => {
        res.render("formularioEventoEdit", { evento: eventos })
    })
})
router.post('/editevento', (req, res) => {
    const eventoModificado = {
        _id: req.body.id,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        imagem: {
            path: "",//fs.readFileSync(req.body.img.userPhoto.path),
            caption: ""//'image/png'
        }
    }
    Evento.findOneAndUpdate({ _id: eventoModificado._id }, eventoModificado).then(() => {
        console.log("Evento editado com sucesso")
    }).catch((err) => {
        console.log("Houve um erro ao editar o Evento: " + err)
    })

    res.redirect("/admin")

})

router.get('/editevento/:_id', (req, res) => {
    Evento.find({ _id: req.params._id }).then((eventos) => {
        res.render("formularioEventoEdicao", { evento: eventos })
    }).catch((err) => {
        console.log("Ocorreu um erro: " + err)
    })
})


router.get('/addtema', (req, res) => {
    res.render("formularioTemasAdd")
})

router.post('/addtema', (req, res) => {
    const novoTema = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        imagem: {
            //path: fs.readFileSync(req.body.img.userPhoto.path),
            //caption: 'image/png'
        }
    }
    new Tema(novoTema).save().then(() => {
        console.log("Tema salva com sucesso")
    }).catch((err) => {
        console.log("Houve um erro ao salvar o Tema: " + err)
    })

    res.redirect("/admin")
})

router.get('/edittema', (req, res) => {
    res.send("formularioTemasEdit")
})

router.get('/promo', (req, res) => {
    res.send("Editar promo")
})

module.exports = router;