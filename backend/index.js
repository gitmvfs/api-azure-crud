const express = require('express');
const cors = require('cors');
const app = express();

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
app.listen(3000, function(){
    console.log('conectado');
})