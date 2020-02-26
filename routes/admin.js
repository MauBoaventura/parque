const express = require("express");
const router = express.Router();

const moment = require('moment')

var multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img')
    },
    filename: (req, file, cb) => {
        cb(null, moment(Date.now()).format("DD-MM-YYYY") + " " +
            file.originalname)
    }
})

const upload = multer({
    storage: storage
});

const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');
require("../models/Evento")
const Evento = mongoose.model("Eventos")
require("../models/Tema")
const Tema = mongoose.model("Temas")



router.get('/', (req, res) => {
    res.render("indexAdmin")
})

//Tela principal 
//Lista todos os eventos do banco de dados
router.get('/evento', (req, res) => {
    Evento.find().then((eventos) => {
        res.render("formularioEvento", {
            evento: eventos,
            teste: true
        })
    })
})

//Chama tela de adicionar um novo evento 
router.get('/addevento', (req, res) => {
    res.render("formularioEventoAdd", {
        message: req.flash('error')
    })
})

//Adiciona ao banco de dados um novo evento, caso correto
router.post('/addevento', upload.array('eventoimg'), (req, res, next) => {

    let image = req.files.map(item => {
        const {
            mimetype,
            path
        } = item
        return {
            mimetype,
            path
        }
    });
    //Insere os dados basicos do evento
    const novoEvento = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        imagem: image
    }

    new Evento(novoEvento).save()
        .then(() => {
            res.locals.teste = "Teste"
            req.flash('error', 'All fields are required!');
            //res.locals.sucess_mgs = req.flash();
            console.log("Salvo o Evento com sucesso")

        }).catch((err) => {
            console.log("Houve um erro ao salvar o Evento: " + err)
            //req.flash("error_msg", { error_msg: "Evento salvo com sucesso" })
            //req.flash("error_msg", "Evento salvo com sucesso")
        })
    //req.flash("error_msg", { error_msg: "Evento salvo com sucesso" })
    res.redirect("/admin/evento")
    next()
})

//Tela de edição do evento
router.get('/editevento/:_id', async (req, res) => {
    await Evento.findById({
            _id: req.params._id
        })
        .then(async (eventos) => {
            // var a = await Evento.create(eventos)
            console.log("\n\n" + eventos + "\n\n")
            // console.log(typeof a);
            // var myobj = JSON.parse(a)
            // console.log("apos: " + typeof myobj);

            res.render("formularioEventoEdicao", {
                evento: eventos
            })
        }).catch((err) => {
            console.log("Ocorreu um erro: " + err)
        })
})

//Edita o evento no banco de dados
router.post('/editevento', (req, res) => {
    if (!req.files === undefined) {

        let image = req.files.map(item => {
            const {
                mimetype,
                path
            } = item
            return {
                mimetype,
                path
            }
        });
    }
    const eventoModificado = {
        _id: req.body.id,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
    }

    Evento.findOneAndUpdate({
        _id: eventoModificado._id
    }, eventoModificado).then(() => {
        console.log("Evento editado com sucesso")
    }).catch((err) => {
        console.log("Houve um erro ao editar o Evento: " + err)
    })
    res.redirect("/admin/evento")
})

//Apagar eventos pelo _id
router.get('/delevento/:_id', (req, res) => {
    Evento.findOneAndRemove({
        _id: req.params._id
    }).then(() => {
        console.log("Evento apagado com sucesso")
    }).catch((err) => {
        console.log("Houve um erro ao apagar o Evento: " + err)
    })

    res.redirect("/admin/evento")
})

//Tela principal 
//Lista todos os temas do banco de dados
router.get('/tema', (req, res) => {
    Tema.find().then((temas) => {
        res.render("formularioTema", {
            tema: temas
        })
    }).catch((err) => {
        console.log("Ocorreu um erro ao acessar os temas")
    })

})

//Chama tela de adicionar um novo tema 
router.get('/addtema', (req, res) => {
    res.render("formularioTemaAdd")
})

//Adiciona ao banco de dados um novo tema, caso correto
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
    res.redirect("/admin/tema")
})

//Tela de edição de tema
router.get('/edittema/:_id', (req, res) => {
    Tema.find({
        _id: req.params._id
    }).then((temas) => {
        res.render("formularioTemaEdicao", {
            tema: temas
        })
    }).catch((err) => {
        console.log("Ocorreu um erro: " + err)
    })
})

//Edita o tema no banco de dados
router.post('/edittema', (req, res) => {
    const temaModificado = {
        _id: req.body.id,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        imagem: {
            path: "", //fs.readFileSync(req.body.img.userPhoto.path),
            caption: "" //'image/png'
        }
    }
    Tema.findOneAndUpdate({
        _id: temaModificado._id
    }, temaModificado).then(() => {
        console.log("Tema editado com sucesso")
    }).catch((err) => {
        console.log("Houve um erro ao editar o tema: " + err)
    })
    res.redirect("/admin/tema")
})

//Apagar temas pelo _id
router.get('/deltema/:_id', (req, res) => {
    Tema.findOneAndRemove({
        _id: req.params._id
    }).then(() => {
        console.log("Tema apagado com sucesso")
    }).catch((err) => {
        console.log("Houve um erro ao apagar o tema: " + err)
    })

    res.redirect("/admin/tema")
})

router.get('/promo', (req, res) => {
    res.send("Editar promo")
})

router.get("/teste", upload.single('evento'), (req, res) => {
    console.log(req.file)
})

module.exports = router;