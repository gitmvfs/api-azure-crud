const router = require('express').Router();

// variavel que chama o controller
const catOcultaController = require('../controllers/catOcultaController');


// rota POST
router.route('/categoriaOculta').post((req, res) => catOcultaController.create(req, res));

// rota GET ALL
router.route('/categoriaOculta').get((req, res) => catOcultaController.getAll(req, res));

// rota GET
router.route('/categoriaOculta/:id').get((req, res) => catOcultaController.get(req, res));

// rota UPDATE
router.route('/categoriaOculta/:id').put((req, res) => catOcultaController.update(req, res));

module.exports = router;