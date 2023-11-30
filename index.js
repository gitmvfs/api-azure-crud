//Import das bibliotecas
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")

// Import dos scripts
const script_admin = require("./scripts/adminScript")
const script_categoria = require("./scripts/categoriaScript")
const script_produto = require("./scripts/produtoScript")

//permite que a API receba dados cross Origin
app.use(cors())

//recebendo arquivos em formato json
app.use(express.json())

//configurando variaveis de ambiente
dotenv.config()


// Configuração do servidor
const server_port = process.env.SERVER_PORT || 3000;
const banco_string = process.env.BANCO_STRING || "mongodb://localhost:27017/ecommerce"; 
const blob_string = process.env.BLOB_STRING;


// rotas 
const routes = require('./routes/router');
app.use('', routes)
app.use('./produtoAtivoRouter', routes)

app.use('/loginAdmin', routes)
app.use('/register', routes)
app.use('/loginUser', routes)

// conectando com o banco
mongoose.connect(banco_string, {dbName: 'e-fodase'})
.then(() =>{
    console.log("Conectado ao banco com sucesso.")
   
    app.listen( server_port, "0.0.0.0",() =>{
        console.log("Servidor aberto na porta: " + server_port)})

    // Chamando os scripts de insert caso o banco esteja vazio

    script_admin()
    script_categoria()
    script_produto()

})
.catch((erro) =>{
    console.log("Erro ao conectar ao banco de dados: " + erro)
})
 