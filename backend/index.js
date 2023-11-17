const express = require('express');
const cors = require('cors');
const app = express();

const script = require("./models/ademiro/adminInsert")
// Colocando variaveis de ambiente

const dotenv = require("dotenv")

dotenv.config()

//permite que a API receba dados cross Origin
app.use(cors())

//recebendo arquivos em formato json
app.use(express.json())

// rotas 
const routes = require('./routes/router');
// const produto = require("./routes/produto/produto_post")

app.use('/api', routes)
// app.use("/produto", produto)

app.post("/logar" , (req,res,next) =>{
    const login = req.body.login
    const senha = req.body.password

    console.log("Login e senha: " + login + " " + senha)

})
// ouvindo uma porta

const mongoose = require("mongoose")
 
mongoose.connect("mongodb://gllmm:GvjzNgjDXFT29o0S7bmq6q9ww6JAAdltwa0aaMhM98Vamxx2JrI3oP3JBtUbyvRWgNlEcfDDVaZgACDbwN9H9w==@gllmm.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@gllmm@")
.then(() =>{

    script()
    console.log("Conectado ao banco com sucesso.")
    app.listen(  3000, "0.0.0.0", () =>{
        console.log("Servidor aberto na porta: " + "3000")
   
    })
   
})
.catch((erro) =>{
    console.log("Erro ao conectar ao banco de dados: " + erro)
})
 
