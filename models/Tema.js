const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Tema = new Schema({
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
    },
    data: {
        type: Date,
        default: Date.now()
    }
})
mongoose.model("Temas", Tema)