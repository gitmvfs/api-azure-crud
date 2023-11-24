const Token = require('../../controller/jwt');
const User = require('../user/userModel')

function registerToken (id,email,msg="Cadastrado!!") {
    try {
        // Gera o token 
        const tokenGerado = Token.gerarToken(id, email);

        // Obtém o usuário pelo e-mail
        const user = User.findOne({ email });

        if (user) {
            // Salva o token no usuário
            User.saveToken(tokenGerado);

            return {
                status: 201,
                message: msg,
                token: tokenGerado,
                expirity: new Date().setHours(new Date().getHours() + 2)
            };
        } else {
            // Usuário não encontrado
            return {
                status: 404,
                error: 'Usuário não encontrado'
            };
        }
    } catch (error) {
        console.error(error);
            return {
            status: 500,
            message: 'Servidor morreu'
        };
    }
}

module.exports = {
    registerToken,
}