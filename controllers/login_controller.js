const mongoose = require("mongoose");

const controller_login = async (email, senha, modelo) => {
  try {
    const resultado = await modelo.find({ email: email });

    if (resultado.length > 0) {
      const usuario = resultado[0];

      if (usuario.senha === senha) {
        return 200; // Senha correta
      } else {
        return 401; // Senha incorreta
      }
    } else {
      return 404; // Usuário não encontrado
    }
  } catch (error) {
    console.error(error);
    return 500; // Erro interno do servidor
  }
};



module.exports = { controller_login};
