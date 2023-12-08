const mongoose = require("mongoose");
const produtoModelo = require("../models/produto/schema");
const auto_increment = require("../controllers/auto_increment");

mongoose.Promise = global.Promise;

const verificar_banco = async () => {
  produtoModelo.find().then((result) => {
    if (result.length > 0) {
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

    let novoProduto = new produtoModelo({
      
      index:index,
      nome:"vestido midi com fenda mindset preto",
      preco: 199,
      genero:"unissex",
      descricao:"Andando nas nuves",
      tamanhos:["P","PP","M","G"],
      cor:"preto",
      tipo:"vestido",
      linkFoto1:"https://cea.vtexassets.com/arquivos/ids/58332780-1600-auto?v=638367984765670000&width=1600&height=auto&aspect=true",
      linkFoto2:"https://cea.vtexassets.com/arquivos/ids/58332782-1600-auto?v=638367984774600000&width=1600&height=auto&aspect=true",
      linkFoto3:"https://cea.vtexassets.com/arquivos/ids/58332780-1600-auto?v=638367984765670000&width=1600&height=auto&aspect=true",
      fk_categoria: "festa"

    });

    await novoProduto.save();

     index = await auto_increment(produtoModelo);

     novoProduto = new produtoModelo({
      
      index:index,
      nome:"camisa oversized manga longa off white",
      preco: 139,
      genero:"unissex",
      descricao:"Andando nas nuves",
      tamanhos:["P","PP","M","G", "GG"],
      cor:"branco",
      tipo:"camisa",
      linkFoto1:"https://cea.vtexassets.com/arquivos/ids/58188391-1600-auto?v=638331495396070000&width=1600&height=auto&aspect=true",
      linkFoto2:"https://cea.vtexassets.com/arquivos/ids/58188392-1600-auto?v=638331495400570000&width=1600&height=auto&aspect=true",
      linkFoto3:"https://cea.vtexassets.com/arquivos/ids/58188393-1600-auto?v=638367984765670000&width=1600&height=auto&aspect=true",
      fk_categoria: "festa"

    });

    await novoProduto.save();

    index = await auto_increment(produtoModelo);


  } catch (err) {
    console.log("Erro ao executar script categoria: " + err);
  }
};

module.exports = verificar_banco;
