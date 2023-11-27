const router = require('express').Router()

const carrinhoModel = require('../models/carrinho/schema')

// metodos CRUD carrinho de compras
const rotaCarrinho = {
    create: async(req, res) => {
        const carrinho = {
            index: req.body.index,
            fk_usuario: req.body.fk_usuario,
            fk_produto: req.body.produtos

        }
        
        try {
            const response = await carrinhoModel.create(carrinho)

            res.status(201).json({response})
        } catch (error) {
            console.log(error)
        }
    },
    
    get: async(req, res) => {
        try {

            const id = req.params.id
            const carrinho = await carrinhoModel.findById(id)

            if(!carrinho){
                res.status(404).json({msg: 'carrinho não encontrado.'})
            }

            res.json(carrinho)

        } catch (error) {
            console.log(error)
        }
    },

    update: async(req, res) =>{
        try {
            const id = req.params.id
            
            const carrinho = {
                index: req.body.index,
                fk_usuario: req.body.fk_usuario,
                fk_produto: req.body.produtos
            }

            const carrinhoAtualizado = await carrinhoModel.findByIdAndUpdate(id, carrinho)

            res.status(200).json({msg: 'carrinho atualizado: ', carrinhoAtualizado})
        } catch (error) {
            console.log(error)
        }
    }
}


// ROTAS 

// POST
router.route('/carrinho').post((req, res) => rotaCarrinho.create(req, res))

// GET
router.route('/carrinho/:id').get((req, res) => rotaCarrinho.get(req, res))

// UPDATE
router.route('/carrinho/:id').put((req, res) => rotaCarrinho.update(req, res))

module.exports = router