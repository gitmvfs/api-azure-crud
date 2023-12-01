const User = require('../models/user/schema');
const { gerarToken } = require('./jwt');

exports.post = (req, res, email) => {

    try {
        // 
        const SalvarDados = ({
            email: req.body.email,
            senha: req.body.senha
        });
        if (SalvarDados.email != undefined && SalvarDados.senha != undefined) {
            User.find({ email: SalvarDados.email })
                .then((resultado) => {

                    let resultado_tratado = resultado
                    resultado_tratado = resultado_tratado[0]

                    if (resultado_tratado === undefined) {
                         res.status(404).send("Usuario não cadastrado")
                    }

                    else if (resultado_tratado.senha != SalvarDados.senha) {
                        res.status(401).json('Senha incorreta')
                    }

                    if (resultado_tratado.senha === SalvarDados.senha) {

                        const tokenGerado = gerarToken(email)

                        if (tokenGerado) {
 
                         // Atualizar o usuario adicionando o token
                         User.updateOne({ email: SalvarDados.email }, { $set: { token: tokenGerado } })
                             .then(() => {
                                 res.status(200).json({ token: tokenGerado });
            
                             })
                             .catch((error) => {
                                 console.error(error);
                                 res.status(500).send({ status: 500, message: 'Erro ao salvar o token' });
                             });
                         }
                     }              
          
            });
        }
     } catch (error) {
         console.error(error);
         res.status(500).send({ status: 500, message: 'Servidor morreu' });
     }
}

