const { produtoAtivo: produtoAtivoSchema } = require('../models/produtos_ativos/produtosAtivosModelo')

const produtoController = {

    // rota post
    create: async(req, res) => {
        const produto = {
            index: req.body.index,
            nome: req.body.nome,
            preco: req.body.preco,
            genero: req.body.genero,
            descricao: req.body.descricao,
            tamanhos: req.bodytamanhos,
            cor: req.body.cor,
            tipo: req.body.tipo,
            linkFoto1: req.body.linkFoto1,
            linkFoto2: req.body.linkFoto2,
            linkFoto3: req.body.linkFoto3,
            fk_categoria: req.body.fk_categoria,
        };

        try{
            // criando resposta
            const response = await produtoAtivoSchema.create(produto)
            res.status(201).json({response})
        }
        catch(err){
            console.log(err)
        }
    },

    // rota para pegar todos
    getAll: async(req, res) => {
        try{
            const produto = await produtoAtivo.find()
            res.json(produto)
        }
        catch(err){
            console.log(err)
        }
    },

    // pegar por id
    get: async(req, res) => {
        try{
            const id = req.params.id

            const produto = await produtoAtivo.findById(id)

            if(!produto){
                res.status(404).json({msg: 'produto não encontrado'})
            }
        }
        catch(err){
            console.log(err)
        }
    },

    // DELETE
    delete: async(req, res) => {
        const id = req.params.id

        const produto = await produtoAtivo.findById(id)

        if(!produto){
            res.status(404).json({msg: 'produto não encontrado'})
            return;
        }

        const produtoDeletado = await produtoAtivo.findByIdAndDelete(id)
        res.status(201).json({produtoDeletado, msg:'produto deletado com sucesso'})
    },

    // UPDATE
    update: async(req, res) => {
        const id = req.params.id

        const produto = {
            index: req.body.index,
            nome: req.body.nome,
            preco: req.body.preco,
            genero: req.body.genero,
            descricao: req.body.descricao,
            tamanhos: req.bodytamanhos,
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

module.exports = produtoController;