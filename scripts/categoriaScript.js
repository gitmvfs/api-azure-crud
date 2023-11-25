const mongoose = require("mongoose")
const categoriaModelo = require("../models/categoriaAtiva/schema")
const auto_increment = require("../controllers/auto_increment")

mongoose.Promise = global.Promise;

const cadastrar = () => {

const novaCategoria1 = new categoriaModelo({

    index: auto_increment(categoriaModelo),
    nome : "verao",
    descricao:"Roupas leves e versáteis que trazem sofisticação e elegância no verão",
    inicio: new Date("21-12-2023"),
    fim: new Date("03-20-2024"),
    img: "https://i.pinimg.com/originals/72/cd/53/72cd53711468527bd3501638827ffabb.jpg"
})



adminModelo.find()
.then((result) =>{

    if(result != 0){
    
        console.log("Categoria ja cadastrada. ")
    
    }
    else{

        adminModelo.insertMany([novaCategoria1,])
        .then((admSalvo) => {
        console.log("Categoria salva com sucesso" )
    
    })
     
        .catch((erro) =>{
        console.log("Erro" + erro)
    
    })
}})


// salvando


}

module.exports = cadastrar