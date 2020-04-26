const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
mongoose.set('useFindAndModify', false);
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
    },
    data: {
        type: Date,
        default: Date.now()
    }
})
mongoose.model("Eventos", Evento)