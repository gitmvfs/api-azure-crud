const mongoose = require('mongoose');
const categoriaAtiva = require('../categoriaAtiva/schema');
const autoIncrementMiddleware = require('../../controllers/produtosController');
// const capitalizeFieldsMiddleware = require('../../controllers/produtosController');

const produtoAtivoSchema = new mongoose.Schema({
    pk_idProduto: {
        type: Number,
        index: true,
        required: false,
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
        PP: { type: Boolean, default: false },
        P: { type: Boolean, default: false },
        M: { type: Boolean, default: false },
        G: { type: Boolean, default: false },
        GG: { type: Boolean, default: false },
        XGG: { type: Boolean, default: false },
    },
    cor: {
        type: Array,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['Vestido', 'Macacão', 'Calça', 'Blusa', 'Camisa', 'Calçado', 'Blazer', 'Paletó']
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
                const categoria_validacao = await categoriaAtiva.findOne({ _id: value });
                return !!categoria_validacao;
            },
            message: 'Categoria não encontrada.',
        },
    },
});

produtoAtivoSchema.pre('save', autoIncrementMiddleware);
// produtoAtivoSchema.pre('save', capitalizeFieldsMiddleware);

const Produto = mongoose.model('Produto', produtoAtivoSchema);

module.exports = Produto