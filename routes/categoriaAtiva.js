const router = require('express').Router();

const categoriaController = require('../controllers/categoriaController')

//rota do metodo POST
router.route('/categoriaAtiva').post((req, res) => categoriaController.create(req, res));

//rota GET ALL
router.route('/categoria').get((req, res) => categoriaController.getAll(req, res));

// rota GET
router.route('/categoria/:id').get((req, res) => categoriaController.get(req, res))

// rota DELETE
router
  .route("/categoria/:id")
  .delete((req, res) => categoriaController.delete(req, res));

// rota UPDATE
router.route('/categoria/:id').put((req, res) => categoriaController.update(req, res));

module.exports = router;