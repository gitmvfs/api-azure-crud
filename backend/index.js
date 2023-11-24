const express = require('express');
const cors = require('cors');
const app = express();
const controllerLoginAdm = require('./controllers/controllerLoginAdm')
const controllerRegister = require('./controllers/controllerRegister')
const controllerLoginUser = require('./controllers/controllerLoginUser')

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


app.use('/logar', controllerLoginAdm.post)
app.use('/cadastro', controllerRegister.post)
app.use('/loginUser', controllerLoginUser.post)



// ouvindo uma porta

const mongoose = require("mongoose");
const { gerarToken } = require('./controllers/jwt');
 
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
 
