const mongoose = require("mongoose")
const Produto = require('./produtosAtivosModelo')

mongoose.Promise = global.Promise;

const inserirProduto = () => {

    const novoProduto = new Produto({
        pk_idProduto: 1,
        nome: "vestidinho",
        preco: 1200,
        genero: "masculino",
        descricao: "não compre se não for usar",
        tamanho: "PP",
        cor: "verde",
        tipo: "Vestido",
        linkFoto1:"https://veterinario.pt/wp-content/uploads/2015/09/cat-pet-animal-domestic-gato800.jpg",
        linkFoto2:"",
        linkFoto3:"",
        categoria: 1
    })

    novoProduto.save()
}

module.exports = inserirProduto