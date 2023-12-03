//Import das bibliotecas
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Import dos scripts

// const script_admin = require("./scripts/adminScript")
const script_categoria = require("./scripts/categoriaScript")
const script_produto = require("./scripts/produtoScript")

//permite que a API receba dados cross Origin
app.use(cors())
app.use(express.json())

//recebendo arquivos em formato json

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
    apis: ['./docs/*.js'],
  };
  
  const swaggerSpec = swaggerJSDoc(options);
  
  // Use o Swagger UI Express para servir a documentação Swagger
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  
// rotas 

const rota_categoria = require("./routes/categoria")
const rota_produto = require("./routes/produto")
const rota_imagem = require("./routes/imagem")

app.use('',rota_categoria)
app.use('',rota_produto)
app.use('',rota_imagem)

// conectando com o banco
mongoose.connect(banco_string, {dbName: 'testeFinal'})
.then(() =>{
    console.log("Conectado ao banco com sucesso.")
   
    app.listen( server_port, "0.0.0.0",() =>{
        console.log("Servidor aberto na porta: " + server_port)})

    // Chamando os scripts de insert caso o banco esteja vazio

    const executar_script = async() => {

    // script_admin()
    await script_categoria()
    script_produto()
    }

    executar_script()
    
})
.catch((erro) =>{
    console.log("Erro ao conectar ao banco de dados: " + erro)
})
 