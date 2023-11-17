const express = require('express');
const cors = require('cors');
const app = express();

// Colocando variaveis de ambiente

const dotenv = require("dotenv")

dotenv.config()

//permite que a API receba dados cross Origin
app.use(cors())

//recebendo arquivos em formato json
app.use(express.json())

// variavel de conexão com o banco
const connect = require('../services/connect')
connect();

// rotas 
const routes = require('./routes/router');

app.use('/api', routes)

// ouvindo uma porta

const mongoose = require("mongoose")
 
mongoose.connect("mongodb://gllmm:GvjzNgjDXFT29o0S7bmq6q9ww6JAAdltwa0aaMhM98Vamxx2JrI3oP3JBtUbyvRWgNlEcfDDVaZgACDbwN9H9w==@gllmm.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@gllmm@")
.then(() =>{
    console.log("Conectado ao banco com sucesso.")
    app.listen( server_port, () =>{
        console.log("Servidor aberto na porta: " + server_port)
   
    })
   
})
.catch((erro) =>{
    console.log("Erro ao conectar ao banco de dados: " + erro)
})
 
