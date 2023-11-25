const mongoose = require("mongoose")
const categoriaModelo = require("../models/categoriaAtiva/schema")
const auto_increment = require("../controllers/auto_increment")

mongoose.Promise = global.Promise;


const verificar_banco = async() => {

    categoriaModelo.find()
    .then((result) => {

        if(result.length != 0){

            console.log("Categoria já cadastrada.")

        }
        else{
            script_cadastrar()
        }
    })

}


const script_cadastrar = async() =>{


    // Crie e salva os modelos padrões no banco de dados
    // Eles estão sendo criados e salvos um após o outro, por que caso contrário o script auto_increment ele não funciona quando usa .insertMany([])

    try{
        
        let index = await auto_increment(categoriaModelo);

        const novaCategoria1 = new categoriaModelo({
        index: index,
        nome: "verao",
        descricao: "Roupas leves e versáteis que trazem sofisticação e elegância no verão",
        inicio: new Date("2023-12-21"), 
        fim: new Date("2024-03-20"),   
        img: "https://i.pinimg.com/originals/72/cd/53/72cd53711468527bd3501638827ffabb.jpg",
        });

        await novaCategoria1.save()

        index = await auto_increment(categoriaModelo);

        const novaCategoria2 = new categoriaModelo({
        index: index,
        nome: "inverno",
        descricao: "Peças elegantes e clássicas para se manter aquecido no inverno com a essência de Etheral Club ",
        inicio: new Date("2023-06-20"), 
        fim: new Date("2024-09-22"),   
        img: "https://th.bing.com/th/id/R.87187b8ddbbd97e91e6414f1a74bf80b?rik=ZP5hELPl74gNVQ&riu=http%3a%2f%2fwww.inspiredluv.com%2fwp-content%2fuploads%2f2016%2f03%2fWinter-Look.jpg&ehk=fWF1l1dKKIxmWISvq1qhcjYhY5RmGlJ6cGARP%2bfPt7g%3d&risl=&pid=ImgRaw&r=0",
        });

        await novaCategoria2.save()


    }
    catch(err){

        console.log("Erro ao executar script categoria: " + err)

    }
    finally{

        console.log("Categoria cadastrada com sucesso")

    }

}
    

module.exports = verificar_banco