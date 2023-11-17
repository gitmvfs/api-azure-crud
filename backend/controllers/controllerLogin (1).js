const Token = require('./jwt');
const User = require('../models/ademiro/AdminModel');


exports.post = (req, res, id, login) => {

    try {
        // 
        const SalvarDados = ({
            login: req.body.login,
            senha: req.body.password
        });
        
        if (SalvarDados.login != undefined && SalvarDados.senha != undefined) {
            User.find({ login: SalvarDados.login })
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
                        const tokenGerado = Token.gerarToken(id, login);
                        
                        if(tokenGerado) {
                            res.status(200).json(tokenGerado)
                        } else{
                            res.status(501).json('Token não gerado')
                        }
                    }
                }) 

        }} catch (error) {
            console.error(error);
            res.status(500).send({ status: 500, message: 'Servidor morreu' });
        }
}

