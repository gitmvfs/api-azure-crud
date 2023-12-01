const router = require("express").Router();
const auto_increment = require("../controllers/auto_increment")

const produtoAtivo = require('../models/produtos_ativos/schema');

let index = auto_increment(produtoAtivo);

const produtoAtivoRota = {

    // rota post
    create: async(req, res) => {

        const produto = {
            pk_idProduto: req.body.pk_idProduto,
            nome: req.body.nome,
            preco: req.body.preco,
            genero: req.body.genero,
            descricao: req.body.descricao,
            tamanhos: req.body.tamanhos,
            cor: req.body.cor,
            tipo: req.body.tipo,
            linkFoto1: req.body.linkFoto1,
            linkFoto2: req.body.linkFoto2,
            linkFoto3: req.body.linkFoto3,
            fk_categoria: req.body.fk_categoria,
        };

        try{
            // criando resposta
            const response = await produtoAtivo.create(produto)
            res.status(201).json({response})
        }
        catch(error){
            res.status(500).send({status:500, message: "Servidor fora do ar"})
            console.log(error)
        }
    },

    // rota para pegar todos
    getAll: async(req, res) => {
        try{
            const produtos = await produtoAtivo.find()
            res.send(produtos)

            if(!produtos){
                res.status(404).json({msg: 'produtos não encontrados'})
                return;
            }
        }
        catch(err){
            res.status(500).send({status:500, message: "Servidor fora do ar"})
            console.log(err)
        }
    },

    // pegar por id
    get: async(req, res) => {
        try{
            const id = req.params.pk_idProduto

            const produto = await produtoAtivo.findOne({pk_idProduto: id})
            res.send(produto)

            if(!produto){
                res.status(404).send({msg: 'produto não encontrado'})
                return;
            }
        }
        catch(err){
            res.status(500).send({status:500, message: "Servidor fora do ar"})
            console.log(err)
        }
    },

    // DELETE
    delete: async(req, res) => {
        const id = req.params.pk_idProduto

        const produto = await produtoAtivo.findOne(id)

        if(!produto){
            res.status(404).json({msg: 'produto não encontrado'})
            return;
        }

        const produtoDeletado = await produtoAtivo.findByIdAndDelete(id)
        res.status(201).json({produtoDeletado, msg:'produto deletado com sucesso'})

        
    },

    // UPDATE
    update: async(req, res) => {
        const id = req.params.pk_idProduto

        const produto = {
            pk_idProduto: req.body.pk_idProduto,
            nome: req.body.nome,
            preco: req.body.preco,
            genero: req.body.genero,
            descricao: req.body.descricao,
            tamanhos: req.body.tamanhos,
            cor: req.body.cor,
            tipo: req.body.tipo,
            linkFoto1: req.body.linkFoto1,
            linkFoto2: req.body.linkFoto2,
            linkFoto3: req.body.linkFoto3,
            fk_categoria: req.body.fk_categoria,
        };

        const produtoAtualizado = await produtoAtivo.findByIdAndUpdate(id, produto)

        if(!produtoAtualizado){
            res.status(404).json({msg: 'produto não encontrado'})
            return;
        }

        res.status(200).json({produtoAtualizado, msg: 'produto atualizado'})
    }
}

// rota post
router.route('/produtoAtivo').post((req, res) => produtoAtivoRota.create(req, res));

// rota get all
router.route('/produtos').get((req, res) => produtoAtivoRota.getAll(req, res));

// rota getById
router.route('/produto/:id').get((req, res) => produtoAtivoRota.get(req, res));

// rota delete
router
    .route('/produto/:id')
    .delete((req, res) => produtoAtivoRota.delete(req, res));

// rota update
router.route('/produto/:id').put((req, res) => produtoAtivoRota.update(req, res));

module.exports = router;