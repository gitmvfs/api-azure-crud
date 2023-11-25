const mongoose = require("mongoose")
const adminModelo = require("../models/admin/schema")

mongoose.Promise = global.Promise;

const cadastrar = ()=> {


const novoAdm1 = new adminModelo({
    email: "fatimaetp@gmail.com",
    senha: "1234",
    token: ""
})

const novoAdm2 = new adminModelo({
    email: "capitaocueca@gmail.com",
    senha: "1234",
    token: ""
})

const novoAdm3 = new adminModelo({
    email: "roccoroberto@gmail.com",
    senha: "1234",
    token: ""
})

const novoAdm4 = new adminModelo({
    email: "mangaze@gmail.com",
    senha: "1234",
    token: ""
})

const novoAdm5 = new adminModelo({
    email: "zemanga@gmail.com",
    senha: "1234",
    token: ""
})

adminModelo.find()
.then((result) =>{

    if(result != 0){
        console.log("Usuarios ja cadastrados. ")
    }
    else{

        adminModelo.insertMany([novoAdm1, novoAdm2, novoAdm3, novoAdm4, novoAdm5])
        .then((admSalvo) => {
        console.log("Administrador salvo: " + admSalvo)
    })
        .catch((erro) =>{
        console.log("Erro" + erro)
})

    }   
})


// salvando


}

module.exports = cadastrar