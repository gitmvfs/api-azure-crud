const router = require('express').Router();
const auto_increment = require("../controllers/auto_increment")


// CRIAR AS ROTAS DE GET POST ETC
const  categoriaAtiva  = require('../models/categoriaAtiva/schema')


const categoriaAtivaRota = {
    
    // rota POST
    create: async (req, res) => {
        let index = await auto_increment(categoriaAtiva)

        const nome = req.body.nome
        const descricao = req.body.descricao
        const inicio = req.body.inicio
        const fim = req.body.fim
        const img = req.body.img

         const novaCategoria = new categoriaAtiva({
        index: index,
        nome: nome,
        descricao: descricao, 
        inicio: new Date(inicio), 
        fim: new Date(fim),   
        img: img 
         });
        
        try {

            //criando a resposta para enviar pro banco
            novaCategoria.save()
            .then(( resultado) =>{

                res.json(" Cadastrado com sucesso " +resultado).status(201)
            })
            .catch((err) =>{

                res.json({"err" : err}).status(400)
            })

        } catch (error) {
            console.log(error)
        }
    },

    // rota GETALL
    getAll: async(req, res) => {
        try {
            const categorias = await categoriaAtiva.find()
            res.send(categorias).status200
            
        } catch (error) {
            console.log(error);
            res.json({erro:err}).status(500)
        }
    },

    // metodo GET BY ID
    get: async(req, res) => {
        const index = req.params.id
        
        categoriaAtiva.findOne({ index: index })
            .then((categoriaRecuperada) => {
                if (categoriaRecuperada) {
                
                    res.status(201).send(categoriaRecuperada);
              
                } else {
                    // Se o documento não foi encontrado
                    res.status(404).json({ msg: 'Categoria não encontrada' });
                }
            })
            .catch((err) => {

                res.status(500).json({ erro: err });
           
            });
    },

    //metodo DELETE
    delete: async(req, res) => {
        const index = req.params.id
       
    categoriaAtiva.findOneAndDelete({ index: index })
        .then((categoriaDeletada) => {
            if (categoriaDeletada) {
                res.status(201).json({ categoriaDeletada, msg: 'Categoria deletada com sucesso' });
            } else {
                // Se o documento não foi encontrado
                res.status(404).json({ msg: 'Categoria não encontrada' });
            }
        })
        .catch((err) => {
            console.error('Erro ao deletar categoria:', err);
            res.status(500).json({ erro: 'Erro interno no servidor' });
        });

    },

    // metodo UPDATE
    update: async(req, res) => {
        const index = req.params.id;

        const categoria = {
          index: req.body.index,
          nome: req.body.nome,
          descricao: req.body.descricao,
          inicio: req.body.inicio,
          fim: req.body.fim,
          img: req.body.img,
        };

        const categoriaAtualizada = await categoriaAtiva.findOneAndUpdate({index:index},categoria)

        if (!categoriaAtualizada) {
          res.status(404).json({ msg: "categoria não encontrada" });
          return;
        }

        res.status(200).json({categoriaAtualizada, msg: 'categoria atualizada'})
    }

}


//rota do metodo POST
router.route('/categoria').post((req, res) => categoriaAtivaRota.create(req, res));

//rota GET ALL
router.route('/categoria').get((req, res) => categoriaAtivaRota.getAll(req, res));

// rota GET
router.route('/categoria/:id').get((req, res) => categoriaAtivaRota.get(req, res))

// rota DELETE
router
  .route("/categoria/:id")
  .delete((req, res) => categoriaAtivaRota.delete(req, res));

// rota UPDATE
router.route('/categoria/:id').put((req, res) => categoriaAtivaRota.update(req, res));

module.exports = router;
