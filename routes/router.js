const router = require('express').Router();

const categoriaAtivaRouter = require('./categoriaAtiva');
const categoriaOcultaRouter = require('./categoriaOculta');
const imagemRota = require("./imagemRota");

router.use('', categoriaAtivaRouter);
router.use('', categoriaOcultaRouter);
router.use('', imagemRota)

module.exports = router;
