const mongoose = require("mongoose")
const Produto = require('./produtosAtivosModelo')

mongoose.Promise = global.Promise;

const inserirProduto = () => {

    const novoProduto = new Produto({
        pk_idProduto: 1,
        nome: "carro",
        preco: 1300,
        genero: "feminino",
        descricao: "compre se não for usar",
        tamanhos: {
            PP: true
        },
        cor: "azul",
        tipo: "Macacão",
        linkFoto1:"https://veterinario.pt/wp-content/uploads/2015/09/cat-pet-animal-domestic-gato800.jpg",
        linkFoto2:"",
        linkFoto3:"",
        fk_categoria: "6560f31c2c36b61f1ec14531"
    })

    novoProduto.save()
}

module.exports = inserirProduto