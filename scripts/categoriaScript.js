const mongoose = require("mongoose")
const categoriaModelo = require("../models/categoria/schema")
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


        index = await auto_increment(categoriaModelo)

        const novaCategoria3 = new categoriaModelo({
            index: index,
            nome: "festa",
            descricao: "Descubra uma seleção de roupas exclusivas projetadas para celebrar no verdadeiro estilo Ethereal Club.",
            inicio: new Date("2023-01-01"), 
            fim: new Date("2024-01-31"),   
            img: "https://img.freepik.com/fotos-gratis/mulher-linda-com-cabelos-loiros-ondulados-usando-elegante-vestido-bege_273443-1771.jpg?w=360&t=st=1701128461~exp=1701129061~hmac=2090e1fc6848f00cbc7b7de05174bdd164e8086d0647e460683a59675a9f0007",
            });
    
        await novaCategoria3.save()

        index = await auto_increment(categoriaModelo)

        const novaCategoria4 = new categoriaModelo({
            index: index,
            nome: "romantic",
            descricao: "Surpreenda e/ou presenteie seu parceiro com a leveza e ternura da nossa coleção Romantic.",
            inicio: new Date("2023-06-01"), 
            fim: new Date("2024-06-30"),   
            img: "https://img.freepik.com/fotos-gratis/jovem-se-preparando-para-o-casamento_23-2149329158.jpg?w=360&t=st=1701128622~exp=1701129222~hmac=58a6622315c0823dd60d60a740bfb84aeb8d37198da3f953b2295c7c316cc0fa",
            });
    
        await novaCategoria4.save()

        index = await auto_increment(categoriaModelo)

        const novaCategoria5 = new categoriaModelo({
            index: index,
            nome: "casual",
            descricao: "Se mantenha elegante e deslumbrante com Ethereal Club.",
            inicio: new Date("2023-01-01"), 
            fim: new Date("2024-12-31"),   
            img: "https://img.freepik.com/fotos-gratis/retrato-da-moda-da-jovem-mulher-elegante_1328-2732.jpg?w=360&t=st=1701128747~exp=1701129347~hmac=6ee2b4420c3fd97ac6140272561c669dae8ad8ddf35d22840fa26ceccc01a3bf",
            });
    
        await novaCategoria5.save()

    }
    catch(err){

        console.log("Erro ao executar script categoria: " + err)

    }

}
    

module.exports = verificar_banco