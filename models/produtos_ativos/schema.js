const mongoose = require('mongoose');

const capitalizeMiddleware = require('../../controllers/produtos_controller');
const categoria = require('../categoriaAtiva/schema')

const produtoAtivoSchema = new mongoose.Schema({
    pk_idProduto: {
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
        enum: ['Masculino', 'Feminino', 'Unissex']

    },
    descricao: {
        type: String,
        required: true
    },
    tamanhos: {
        type: String,
        required: true,
        enum: ['PP', 'P', 'M', 'G', 'GG', 'XGG']

    },
    cor: {
        type: Array,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['vestido', 'macacão', 'calça', 'blusa', 'camisa', 'calçado', 'blazer', 'paletó']
    },
    linkFoto1: {
        type: String,
        required: true,
        unique: true
    },
    linkFoto2: {
        type: String,
        unique: true
    },
    linkFoto3: {
        type: String,
        unique: true
    },
    fk_categoria: {
        type: String,
        required:true,
        ref: 'categoriaAtiva',
        validate: {
            validator: async function (value) {
                const categoria_validacao = await categoria.findOne({ index: value });
                return !!categoria_validacao;
            },
            message: 'Categoria não encontrada.',
        },
    },
});

produtoAtivoSchema.pre('save', capitalizeMiddleware);

const Produto = mongoose.model('Produto', produtoAtivoSchema);

module.exports = Produto