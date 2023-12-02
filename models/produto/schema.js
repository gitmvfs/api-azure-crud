const mongoose = require('mongoose');
// const capitalizeMiddleware = require('../../controllers/produtos_controller');
const categoria = require("../categoria/schema")

const produtoAtivoSchema = new mongoose.Schema({
    index: {
        type: Number,
        index: true,
        required: true,
        unique: true,
        integer: true
    },
    nome: {
        type: String,
        required: true,
        unique: true
    },
    preco: {
        type: Number,
        required: true
    },
    genero: {
        type: String,
        required: true,
        enum: ['masculino', 'feminino', 'unissex']
    },
    descricao: {
        type: String,
        required: true
    },
    tamanhos: [
        {
          type: String,
          required: true,
          enum: ['PP', 'P', 'M', 'G', 'GG', 'XGG'],
        }
      ],
    cor: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['vestido', 'macacão', 'calça', 'blusa', 'camisa', , 'blazer', 'paletó']
    },
    linkFoto1: {
        type: String,
        required: true,
    },
    linkFoto2: {
        type: String,
    },
    linkFoto3: {
        type: String,
    },
    fk_categoria: {
        type:  String,
        required:true,
        ref: 'categoria',
        validate: {
            validator: async function (value) {
                const categoria_validacao = await categoria.find({ nome: value });
                return !!categoria_validacao;
            },
            message: 'Categoria não encontrada.',
        },
    },
});

// produtoAtivoSchema.pre('save', capitalizeMiddleware);


module.exports = mongoose.model('Produto', produtoAtivoSchema);