const mongoose = require("mongoose")
const produtoModelo = require("../models/produtos_ativos/schema")
const auto_increment = require("../controllers/auto_increment")

mongoose.Promise = global.Promise;

const verificar_banco = async() => {

    produtoModelo.find()
    .then((result) => {

        if(result.length != 0){

            console.log("Produto já cadastrada.")

        }
        else{
            script_cadastrar()
        }
    })

}

const script_cadastrar = async() =>{


    // Crie e salva os modelos padrões no banco de dados
    // Eles estão sendo criados e salvos um após o outro, por que caso contrário o script auto_increment ele não funciona quando usa .insertMany([])

    try{
        
        let index = await auto_increment(produtoModelo);

        const novoProduto1 = new produtoModelo({
        pk_idProduto: index,
        nome: "macacão",
        preco: 1300,
        genero: "unissex",
        descricao: "não compre se não for usar",
        tamanhos:{
            pp: true,
            gg: true
        },
        cor: ["verde", "azul"],
        tipo: "macacão",
        linkFoto1: "https://www.petz.com.br/blog//wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg",
        fk_categoria: 0
        });

        await novoProduto1.save()


    }
    catch(err){

        console.log("Erro ao executar script categoria: " + err)

    }
    finally{

        console.log("Produto cadastrado com sucesso")

    }

}

module.exports = verificar_banco