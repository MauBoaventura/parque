const mongose = require('mongose')

const Schema = mongose.Schema;

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

mongose.model("eventos",Evento)