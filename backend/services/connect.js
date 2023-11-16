const mongoose = require('mongoose');

async function main(){
    
    //tenta fazer a conexão com o banco, senão retorna erro
    try {
        await mongoose.connect();
    } catch (error) {
        console.log(error)
    }

}

module.export = main;