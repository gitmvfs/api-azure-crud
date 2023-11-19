const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose")

//permite que a API receba dados cross Origin
app.use(cors())

//recebendo arquivos em formato json
app.use(express.json())


const server_port = process.env.SERVER_PORT || 3000;
 
// conectando com o banco
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
 

// rotas 
const routes = require('./routes/router');
app.use('/api', routes)

