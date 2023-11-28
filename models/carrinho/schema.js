const mongoose = require('mongoose');

const carrinho = mongoose.Schema( {
    index:{
        type: Number,
        required:true
    },

    fk_usuario: {
        type: String,
        required:true,
        ref:'User',
        // função para validar o relacionamento entre tabelas
        validate:{
            validator: async function(value){
                const validacao_usuario = await User.findOne({ email: value });

                return !!validacao_usuario;
            },

            message: 'Usuário não encontrado.'
        }

    },

    fk_produto:{
        type:Array,
        ref:'Produto',
        validate:{
            validator:async function(value){
                const validacao_produto = await Produto.findOne({id: value});

                return !!validacao_produto;
            },

            message: 'Produto não encontrado.'
        }
    }
})

module.exports = mongoose.model('carrinho', carrinho);