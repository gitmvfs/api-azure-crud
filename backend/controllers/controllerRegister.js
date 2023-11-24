const userInsert = require('../models/user/insertUser')

exports.post = async (req,res) => {
    //Insere os dados no banco
    try {
        // Insere os dados no banco
        const cadastrar = await userInsert.saveUser({
            email: req.body.email,
            senha: req.body.senha
        });

        // Verifique se a inserção foi bem-sucedida e envie a resposta apropriada
        if (cadastrar) {
          
            if(res.status(200)){
                return res.json({
                    status: 200,
                    message: "Cadastro realizado com sucesso!"
                })
            }
            else if (res.status(400)) {
                return res.json({
                    status: 400,
                    message: "Erro ao criar um novo Usuario"
                })
            }
        } 
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: 'Servidor morreu' });
    }
};

