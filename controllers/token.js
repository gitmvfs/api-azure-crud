const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

require("dotenv").config({ path: "../.env" });

const secretKey = process.env.JWT_SECRET || "fallbackSecret"; // Use variável de ambiente ou uma chave padrão

async function gerarToken(email, modelo) {
  try {
    const token = jwt.sign({ email: email }, secretKey, { algorithm: "HS256" });

    const resultado = await modelo.findOneAndUpdate(
      { email: email },
      { token: token },
      { new: true }
    );

    if (!resultado) {
      // Trate conforme necessário, pode lançar uma exceção ou retornar uma resposta de erro.
      return null;
    }

    return token;
  } catch (error) {
    // Trate conforme necessário, pode lançar uma exceção ou retornar uma resposta de erro.
    return null;
  }
}

const verificarToken = async (email, token, modelo) => {
  try {
    const resultado = await modelo.find({ email: email });

    if (resultado.length > 0) {
      const usuario = resultado[0];

      if (usuario.token === token) {
        return 200; //Token correto
      } else {
        return 403; //Token errado -> volta não autorizado
      }
    } else {
      return 404; // não achou o usuário
    }
  } catch (erro) {
    console.log(error);
    return 500;
  }
};


const removerToken = async (email, token, modelo) => {
  try {
    const resultado = await modelo.find({ email: email });

    if (resultado.length > 0) {
      const usuario = resultado[0];

      if (usuario.token === token) {
        await modelo.findOneAndUpdate(
          { email: email },
          { token: undefined },
          { new: true }
        )
        .then((resultado) =>{
          return 200; //Token removido com sucesso
          
        })
        .catch((erro) =>{
          console.log(erro)
          return 500 // falha ao tentar remover o token
        })
      } else {
        return 403; //Token errado -> volta não autorizado
      }
    } else {
      return 404; // não achou o usuário
    }
  } catch (erro) {
    console.log(error);
    return 500;
  }
};

module.exports = {
  gerarToken,
  verificarToken,
  removerToken,
};
