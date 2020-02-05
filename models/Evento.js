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
        path: { type: String },
        caption: { type: String }
    },
    data: {
        type: Date,
        default: Date.now()
    }
})
mongoose.model("Eventos", Evento)