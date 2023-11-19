const {categoriaOculta} = require('../models/categoriaOculta/schema');

const catOcultaController = {

    // rota post
    create: async(req, res) => {
        try {
            // instancia a ser criada
            const categoria = {
                index: req.body.index,
                nome: req.body.nome,
                descricao: req.body.descricao,
                inicio: req.body.inicio,
                fim: req.body.fim,
                img: req.body.img
            }

            // resposta para ser enviada ao banco
            const response = await categoriaOculta.create(categoria)
            // resposta do servidor
            res.status(201).json({response, msg:'categoria oculta criada.'})

        } catch (error) {
            console.log(error)
        }
    },

    getAll: async(req, res) => {
        try {
            const categorias = await categoriaOculta.find()

            // array de todas as categorias presentes no banco
            res.json(categorias)
        } catch (error) {
            console.log(error)
        }
    },

    get: async(req, res) => {
        try {
            const id = req.params.id

            const categoria = await categoriaOculta.findById(id)

            if (!categoria) {
                res.status(404).json({msg: 'categoria não encontrada'})
                return;
            }
        } catch (error) {
            console.log(error)
        }
    },

    update: async(req, res) => {
        try {
            const id = req.params.id

        const categoria = {
            index: req.body.index,
            nome: req.body.nome,
            descricao: req.body.descricao,
            inicio: req.body.inicio,
            fim: req.body.fim,
            img: req.body.img,
          };

        const catAtualizada = await categoriaOculta.findByIdAndUpdate(id, categoria)

        if (!categoria) {
            res.status(404).json({msg: 'categoria não encontrada'})
            return;
        }

        res.status(200).json({catAtualizada, msg:'categoria atualizada'})

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = catOcultaController;