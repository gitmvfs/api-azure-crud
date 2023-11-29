const router = require('express').Router();

const categoriaAtivaRouter = require('./categoriaAtiva');
const categoriaOcultaRouter = require('./categoriaOculta');
const imagemRota = require("./imagemRota");

const produtoAtivoRouter = require('./produtoAtivo')

router.use('', categoriaAtivaRouter);
router.use('', categoriaOcultaRouter);
router.use('', imagemRota)
router.use('',produtoAtivoRouter) 


module.exports = router;
