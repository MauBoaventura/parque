const express = require("express");
const router = express.Router();

const fs = require('fs')
const crypto = require('crypto')
const moment = require('moment')
const formidable = require('formidable')

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

//const fs = require('fs');
//const path = require('path');

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
        let evento = eventos.map((dados) => {
            return {
                _id: dados._id,
                titulo: dados.titulo,
                descricao: dados.descricao
            }
        })
        res.render("formularioEvento", {
            evento: evento,
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
        let {
            mimetype,
            path
        } = item
        path = path.replace("public\\", "").replace("\\", "/")

        console.log(path)
        let id = crypto.randomBytes(4).toString('HEX')

        return {
            id,
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
        .then((eventos) => {
            let dado = {
                _id: eventos._id,
                titulo: eventos.titulo,
                descricao: eventos.descricao,
                data: eventos.data,
                imagem: eventos.imagem,
            }
            let evento = [dado]
            console.log(evento)

            res.render("formularioEventoEdicao", {
                evento: evento
            })
        }).catch((err) => {
            console.log("Ocorreu um erro: " + err)
        })
})

//Edita o evento no banco de dados
router.post('/editevento', async (req, res) => {
    let eventos = await Evento.findById({
        _id: req.body.id
    })
    if (req.files != undefined) {

        let image = req.files.map(item => {
            let {
                mimetype,
                path
            } = item
            path = path.replace("public\\", "").replace("\\", "/")

            console.log(path)
            let id = crypto.randomBytes(4).toString('HEX')

            return {
                id,
                mimetype,
                path
            }
        });

        image.map(item => {
            eventos.imagem.push(item)
        })

        console.log("IMAGE");
        console.log(image);
    }
    console.log(eventos.imagem);

    const eventoModificado = {
        _id: req.body.id,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        imagem: eventos.imagem
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
    }).then((evento) => {
        //Lista de ids a serem apagados
        let ids = evento.imagem.map((item) => {
            return item.id
        })

        //Apagando todas imagens pelo ids
        for (let i = 0; i < ids.length; i++) {
            var index = evento.imagem.indexOf(evento.imagem.find(element => element.id == ids[i]))
            let caminho = 'public/' + evento.imagem[index].path
            try {
                fs.unlinkSync(caminho);
            } catch (error) {
                console.log("ENTROU NO ERRROOOO")
            }
        }
        console.log("Evento apagado com sucesso" + ids)
    }).catch((err) => {
        console.log("Houve um erro ao apagar o Evento: " + err)
    })

    res.redirect("/admin/evento")
})

//Tela principal 
//Lista todos os temas do banco de dados
router.get('/tema', (req, res) => {
    Tema.find().then((temas) => {
        let tema = temas.map((dados) => {
            return {
                _id: dados._id,
                titulo: dados.titulo,
                descricao: dados.descricao
            }
        })
        res.render("formularioTema", {
            tema: tema
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
router.post('/addtema', upload.array('temaimg'), (req, res) => {
    let image = req.files.map(item => {
        let {
            mimetype,
            path
        } = item
        path = path.replace("public\\", "").replace("\\", "/")

        console.log(path)
        let id = crypto.randomBytes(4).toString('HEX')

        return {
            id,
            mimetype,
            path
        }
    });


    const novoTema = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        imagem: image
    }
    console.log(novoTema)

    new Tema(novoTema).save().then((tema) => {
        console.log("Tema salvo com sucesso" + tema)
    }).catch((err) => {
        console.log("Houve um erro ao salvar o Tema: " + err)
    })
    res.redirect("/admin/tema")

})

//Tela de edição de tema
router.get('/edittema/:_id', async (req, res) => {
    await Tema.findById({
        _id: req.params._id
    }).then((temas) => {
        let dado = {
            _id: temas._id,
            titulo: temas.titulo,
            descricao: temas.descricao,
            data: temas.data,
            imagem: temas.imagem,
        }
        let tema = [dado]
        console.log(tema)
        res.render("formularioTemaEdicao", {
            tema: tema
        })
    }).catch((err) => {
        console.log("Ocorreu um erro: " + err)
    })

})

//Edita o tema no banco de dados
router.post('/edittema', async (req, res) => {

    let tema = await Tema.findById({
        _id: req.body.id
    })
    if (req.files != undefined) {

        let image = req.files.map(item => {
            let {
                mimetype,
                path
            } = item
            path = path.replace("public\\", "").replace("\\", "/")

            console.log(path)
            let id = crypto.randomBytes(4).toString('HEX')

            return {
                id,
                mimetype,
                path
            }
        });

        image.map(item => {
            tema.imagem.push(item)
        })
    }
    console.log(tema.imagem);

    const temaModificado = {
        _id: req.body.id,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        imagem: tema.imagem
    }

    Evento.findOneAndUpdate({
        _id: temaModificado._id
    }, temaModificado).then(() => {
        console.log("Tema editado com sucesso")
    }).catch((err) => {
        console.log("Houve um erro ao editar o Tema: " + err)
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

router.post('/api/upload', (req, res, next) => {
    const form = formidable({ multiples: true });
    // console.log(req)
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log("AAAA")
            next(err);
            return;
        }
        console.log({ fields, files })
        res.json({ fields, files });
    });
});

router.post('/deleteimg/:id', async (req, res) => {
    let { id } = req.params
    console.log(id)
    let evento = await Evento.findOne().where({ 'imagem.id': id })

    if (evento == '' || evento == null) {

        let tema = await Tema.findOne().where({ 'imagem.id': id })

        if (tema == '' || tema == null) {
            console.log("Arquivo não encontrado")
            res.json('Fail')
        } else {
            //Encontra e remove o elemento do array da imagem
            var index = tema.imagem.indexOf(tema.imagem.find(element => element.id == id))
            let caminho = 'public/' + tema.imagem[index].path
            try {
                fs.unlinkSync(caminho);
            } catch (error) {
                console.log("ENTROU NO ERRROOOO")
                res.json('ERROR param')
            }
            if (index > -1) {
                tema.imagem.splice(index, 1);
            }
            console.log("tema a ser salvo: ")
            console.log(tema)

            //Atualiza o Banco de dados
            Tema.findOneAndUpdate(
                { 'imagem.id': id }
                , tema).then(() => {
                    console.log("tema editado com sucesso")
                }).catch((err) => {
                    console.log("Houve um erro ao editar o tema: " + err)
                })
        }

    } else {
        //Encontra e remove o elemento do array da imagem
        var index = evento.imagem.indexOf(evento.imagem.find(element => element.id == id))
        let caminho = 'public/' + evento.imagem[index].path
        try {
            fs.unlinkSync(caminho);
        } catch (error) {
            console.log("ENTROU NO ERRROOOO")
            res.json('ERROR param')
        }
        if (index > -1) {
            evento.imagem.splice(index, 1);
        }
        console.log("EVENTO a ser salvo: ")
        console.log(evento)

        //Atualiza o Banco de dados
        Evento.findOneAndUpdate(
            { 'imagem.id': id }
            , evento).then(() => {
                console.log("Evento editado com sucesso")
            }).catch((err) => {
                console.log("Houve um erro ao editar o Evento: " + err)
            })

        res.json('Success')
    }

})

router.post('/insertimgevento', upload.array('imagem'), async (req, res) => {
    console.log("O arquvo inserido foi: ");
    console.log(req.files)
    console.log("Copro")
    console.log(req.body.id)

    let eventos = await Evento.findById({
        _id: req.body.id
    })
    if (req.files != undefined) {

        console.log('itens')
        var image = req.files.map(item => {
            console.log(item)
            let {
                mimetype,
                path
            } = item
            path = path.replace("public\\", "").replace("\\", "/")

            // console.log(path)
            let id = crypto.randomBytes(4).toString('HEX')

            return {
                id,
                mimetype,
                path
            }
        });

        image.map(item => {
            eventos.imagem.push(item)
        })
    }
    console.log(eventos)

    Evento.findOneAndUpdate({
        _id: req.body.id
    }, eventos).then(() => {
        console.log("Imagem inserida com sucesso")
        res.send(eventos.imagem[eventos.imagem.length - 1].id)

    }).catch((err) => {
        console.log("Houve um erro ao editar o Evento: " + err)
        res.send("fail")
    })

})

router.post('/insertimgtema', upload.array('imagem'), async (req, res) => {
    console.log("O arquvo inserido foi: ");
    console.log(req.files)
    console.log("Copro")
    console.log(req.body.id)

    let temas = await Tema.findById({
        _id: req.body.id
    })
    if (req.files != undefined) {

        console.log('itens')
        var image = req.files.map(item => {
            console.log(item)
            let {
                mimetype,
                path
            } = item
            path = path.replace("public\\", "").replace("\\", "/")

            // console.log(path)
            let id = crypto.randomBytes(4).toString('HEX')

            return {
                id,
                mimetype,
                path
            }
        });

        image.map(item => {
            temas.imagem.push(item)
        })
    }
    console.log(temas)

    Tema.findOneAndUpdate({
        _id: req.body.id
    }, temas).then(() => {
        console.log("Imagem inserida com sucesso")
        res.send(temas.imagem[temas.imagem.length - 1].id)

    }).catch((err) => {
        console.log("Houve um erro ao editar o Evento: " + err)
        res.send("fail")
    })

})
module.exports = router;