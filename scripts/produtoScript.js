const mongoose = require("mongoose");
const produtoModelo = require("../models/produto/schema");
const auto_increment = require("../controllers/auto_increment");

mongoose.Promise = global.Promise;

const verificar_banco = async () => {
  produtoModelo.find().then((result) => {
    if (result.length != 0) {
      console.log("Produto já cadastrado.");
    } else {
      script_cadastrar();
    }
  });
};

const script_cadastrar = async () => {
  // Crie e salva os modelos padrões no banco de dados
  // Eles estão sendo criados e salvos um após o outro, por que caso contrário o script auto_increment ele não funciona quando usa .insertMany([])

  try {
    let index = await auto_increment(produtoModelo);

    const novoProduto = new produtoModelo({
      
      index:index,
      nome:"Teste produtos 0",
      preco: 200,
      genero:"unissex",
      descricao:"Andando nas nuves",
      tamanhos:["G","GG","XGG"],
      cor:"branco",
      tipo:"vestido",
      linkFoto1:"https://http2.mlstatic.com/D_NQ_NP_769144-MLB52736363443_122022-O.webp",
      linkFoto2:"https://http2.mlstatic.com/D_NQ_NP_848526-MLB31673576625_082019-O.webp",
      linkFoto3:"",
      fk_categoria: "romantic"

    });

    await novoProduto.save();

    
  } catch (err) {
    console.log("Erro ao executar script categoria: " + err);
  }
};

module.exports = verificar_banco;
