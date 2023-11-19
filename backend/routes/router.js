const router = require('express').Router();

const categoriaAtivaRouter = require('./categoriaAtiva');
const categoriaOcultaRouter = require('./categoriaOculta');


router.use('/', categoriaAtivaRouter);
router.use('/', categoriaOcultaRouter);

module.exports = router;
