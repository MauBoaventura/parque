const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Evento = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    imagem: {
        type: Array,
        path: String,
        mimetype: String,
        default: {
            data: "nada1",
            contentType: "nada2"
        }
    },
    data: {
        type: Date,
        default: Date.now()
    }
})
mongoose.model("Eventos", Evento)