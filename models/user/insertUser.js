const modelUser = require('./userModel');

async function saveUser(body){

    const newUser  = new modelUser({
        telefone: body.telefone,
        email: body.email,
        senha: body.senha
    });

    //Salva no banco o novo usuario
    return await newUser.save()
}

async function queryUsuario(query){

    //Consulta o usuário no banco
    const userSelected = await modelUser.findOne({
        telefone: query.telefone,
        email: query.email,
        senha: query.senha
    });

    console.log(userSelected)
    return userSelected
}

module.exports = {
    saveUser,
    queryUsuario
}
