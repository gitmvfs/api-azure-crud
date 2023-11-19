const mongoose = require('mongoose');

const {Schema} = mongoose;

const categoriaSchema = new Schema({
    index:{
        type: Number,
        required: true
    },

    nome:{
        type:String,
        required:true
    },

    descricao:{
        type: String,
        required:true
    },

    inicio:{
        type:Date,
        required:true
    },

    fim:{
        type:Date,
        required:true
    },

    img:{
        type:String,
        required:true
    }
});

const categoriaAtiva = mongoose.model("categoriaAtiva", categoriaSchema)
module.exports = {
    categoriaAtiva, categoriaSchema,
}