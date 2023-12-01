const router = require('express').Router()
const auto_increment = require("../controllers/auto_increment")

const produtoModelo = require('../models/produtos_ativos/schema')
const categoriaModelo = require('../models/categoriaAtiva/schema')


const produtosAtivaRotas = {


    create: async(req,res)=> {

        let index = await auto_increment(produtoModelo)

        const nome = req.body.nome
        const preco = req.body.preco
        const genero = req.body.genero
        const descricao = req.body.descricao
        const tamanhos = req.body.tamanhos
        const cor = req.body.cor
        const tipo = req.body.tipo
        const linkFoto1 = req.body.linkFoto1
        const linkFoto2 = req.body.linkFoto2
        const linkFoto3 = req.body.linkFoto3
        const categoriaNome = req.body.categoriaNome
        
        let categoria_index = ""
        // Pega o index da categoria pelo nome
        await categoriaModelo.find({nome: req.body.categoriaNome}) 
        .then((resultado) =>{
            categoria_index = resultado[0].index
            console.log("escopo local: "+ categoria_index)
        })

        console.log(
            index,
            nome,
            preco,
            genero,
            descricao,
            tamanhos,
            cor,
            tipo,
            categoria_index
          )

        const novoProduto = new produtoModelo({
            
            index:index,
            nome:nome,
            preco: preco,
            genero:genero,
            descricao:descricao,
            tamanhos:tamanhos,
            cor:cor,
            tipo:tipo,
            linkFoto1:linkFoto1,
            linkFoto2:linkFoto2,
            linkFoto3:linkFoto3,
            fk_categoria: categoria_index


        })
        try{
            novoProduto.save()
            .then((resultado) =>{

                res.json("Cadastrado com sucesso" + resultado).status(201)

            })
            .catch((erro)  =>{
                
                res.json("Erro ao cadastrar:" + erro).status(400)

            })
        }
        catch(error){

            res.json("Erro do Banco de Dados: ").status(500)

        }

    
    },

    get: async(req, res) => {
         try {
            const produtos = await produtoModelo.find()
            res.send(produtos).status(200)
            
        } catch (error) {
            console.log(error);
            res.json({erro:err}).status(500)
        }
    },



}

router.route('/produto').post((req, res) => produtosAtivaRotas.create(req, res));
router.route('/produto').get((req, res) => produtosAtivaRotas.get(req, res));


module.exports = router;