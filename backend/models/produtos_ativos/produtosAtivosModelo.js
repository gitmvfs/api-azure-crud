const mongoose = require('mongoose');
const categoriaAtiva = require('../categoriaAtiva/schema')

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
        enum: ['masculino', 'feminino', 'unissex']
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

produtoAtivoSchema.pre('save', async function(next){
    const doc = this;

    if(!doc.pk_idProduto) {
        Produto.findOne().sort('-pk_idProduto')
        .then((produto) => {
            doc.pk_idProduto = produto ? produto.pk_idProduto + 1 : 1;
            next();
        })
        .catch((error) => {
            return next(error);
        });
    } else {
        next();
    }
});

const Produto = mongoose.model('Produto', produtoAtivoSchema);

module.exports = Produto