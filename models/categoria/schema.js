const mongoose = require('mongoose');

const {Schema} = mongoose;

const categoriaSchema = new mongoose.Schema({
    index:{
        type: Number,
        required: true,
        unique:true,
        interger:true
    },

    nome:{
        type:String,
        required:true,
        unique:true
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
    },

    img:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('categoriaAtiva', categoriaSchema);
