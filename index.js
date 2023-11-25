//Import das bibliotecas
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose")


//permite que a API receba dados cross Origin
app.use(cors())

//recebendo arquivos em formato json
app.use(express.json())

// Configuração do servidor
const server_port = process.env.SERVER_PORT || 3000;
const banco_string = process.env.BANCO_STRING; 
const blob_string = process.env.BLOB_STRING;


//middleware

// rotas 
const routes = require('./routes/router');
app.use('/api', routes)



// conectando com o banco
mongoose.connect(banco_string)
.then(() =>{
    console.log("Conectado ao banco com sucesso.")
   
    app.listen( server_port, () =>{
        console.log("Servidor aberto na porta: " + server_port)})
})
.catch((erro) =>{
    console.log("Erro ao conectar ao banco de dados: " + erro)
})
 