//Import das bibliotecas
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Import dos scripts
const script_admin = require("./scripts/adminScript")
const script_categoria = require("./scripts/categoriaScript")

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

// Defina as opções do Swagger JSDoc
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Api Azure Crud',
        version: '1.0.0',
        description: 'A api tem como função desenvolver um modelo crud de ecommerce',
      },
    },
    apis: ['./docs/categoria-doc.js','./docs/produto-doc.js'],
  };
  
  const swaggerSpec = swaggerJSDoc(options);
  
  // Use o Swagger UI Express para servir a documentação Swagger
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  
// rotas 
const routes = require('./routes/router');

app.use('', routes)
app.use('./produtoAtivoRouter', routes)


// conectando com o banco
mongoose.connect(banco_string, {dbName: 'testeFinal'})
.then(() =>{
    console.log("Conectado ao banco com sucesso.")
   
    app.listen( server_port, "0.0.0.0",() =>{
        console.log("Servidor aberto na porta: " + server_port)})

    // Chamando os scripts de insert caso o banco esteja vazio

    script_admin()
    script_categoria()
    // script_produto()

})
.catch((erro) =>{
    console.log("Erro ao conectar ao banco de dados: " + erro)
})
 