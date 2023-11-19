// CRIAR AS ROTAS DE GET POST ETC
const { categoriaAtiva: categoriaModel } = require('../models/categoriaAtiva/schema')

const categoriaController = {

    // rota POST
    create: async (req, res) => {
        const categoria = {
            index: req.body.index,
            nome: req.body.nome,
            descricao: req.body.descricao,
            inicio: req.body.inicio,
            fim: req.body.fim,
            img: req.body.img,
        };
        
        try {

            //criando a resposta para enviar pro banco
            const response = await categoriaModel.create(categoria)

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

            const categoria = await categoriaAtiva.findById(id)

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

        const categoria = await categoriaAtiva.findById(id)
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

module.exports = categoriaController;