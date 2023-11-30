const router = require('express').Router();
const auto_increment = require("../controllers/auto_increment")


// CRIAR AS ROTAS DE GET POST ETC


const categoriaAtiva = require('../models/categoriaAtiva/schema')


const categoriaAtivaRota = {
    
    // rota POST
    create: async (req, res) => {
        let index = await auto_increment(categoriaAtiva)
        const categoria = {
            index: index,
            nome: req.body.nome,
            descricao: req.body.descricao,
            inicio: req.body.inicio,
            fim: req.body.fim,
            img: req.body.img,
        };
        
        try {

            //criando a resposta para enviar pro banco

            const response = await categoriaAtiva.create(categoria)


            res.status(201).json({response})

        } catch (error) {
            console.log(error)
        }
    },

    // rota GETALL
    getAll: async(req, res) => {
        try {
            const categorias = await categoriaAtiva.find()
            res.json(categorias)
            
        } catch (error) {
            console.log(error);
        }
    },

    // metodo GET BY ID
    get: async(req, res) => {
        try {
            const id = req.params.id

            const categoria = await categoriaAtiva.findOne(id)

            if(!categoria){
                res.status(404).json({msg: 'categoria não encontrada'})
                return;
            }

            res.json(categoria)
        } catch (error) {
            console.log(error);
        }
    },

    //metodo DELETE
    delete: async(req, res) => {
        const id = req.params.id

        const categoria = await categoriaAtiva.findOne(id)
        if (!categoria) {
          res.status(404).json({ msg: "categoria não encontrada" });
          return;
        }

        const categoriaDeletada = await categoriaAtiva.findByIdAndDelete(id)

        res.status(201).json({categoriaDeletada, msg: 'categoria deletada com sucesso'})
    },

    // metodo UPDATE
    update: async(req, res) => {
        const id = req.params.id;

        const categoria = {
          index: req.body.index,
          nome: req.body.nome,
          descricao: req.body.descricao,
          inicio: req.body.inicio,
          fim: req.body.fim,
          img: req.body.img,
        };

        const categoriaAtualizada = await categoriaAtiva.findByIdAndUpdate(id, categoria)

        if (!categoriaAtualizada) {
          res.status(404).json({ msg: "categoria não encontrada" });
          return;
        }

        res.status(200).json({categoriaAtualizada, msg: 'categoria atualizada'})
    }

}


//rota do metodo POST
router.route('/categoriaAtiva').post((req, res) => categoriaAtivaRota.create(req, res));

//rota GET ALL
router.route('/categorias').get((req, res) => categoriaAtivaRota.getAll(req, res));


// rota GET
router.route('/categoria/:id').get((req, res) => categoriaAtivaRota.get(req, res))

// rota DELETE
router
  .route("/categoria/:id")
  .delete((req, res) => categoriaAtivaRota.delete(req, res));

// rota UPDATE
router.route('/categoria/:id').put((req, res) => categoriaAtivaRota.update(req, res));

module.exports = router;
