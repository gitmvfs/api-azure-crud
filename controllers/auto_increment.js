const mongoose = require("mongoose")


// Faz uma pesquisa no modelo e cria uma promise com a index, caso consiga fazer a pesquisa devolve o tamanho da lista + 1

const auto_increment = (modelo) => {
  return new Promise((resolve, reject) => {
    
    modelo.find().lean()
      .then((result) => {
        const index = result.length ;
        resolve(index);
      })
      .catch((error) => {
        console.error("Error:", error);
        reject(error);
      });
  });

};


module.exports = auto_increment