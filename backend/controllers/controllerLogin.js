const Token = require('../model/token/insertToken');
const User = require('../model/user/userModel');


exports.post = (req, res) => {

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
                      
                    else if (resultado_tratado.senha === SalvarDados.senha) {
                        const tokenSocorro =  Token.registerToken(resultado_tratado._id, resultado_tratado.email)
                        res.status(200).json(tokenSocorro)

                    }
                }) 

        }} catch (error) {
            console.error(error);
            res.status(500).send({ status: 500, message: 'Servidor morreu' });
        }
}

