const router = require('express').Router();

const categoriaAtivaRouter = require('./categoriaAtiva');
const imagemRota = require("./imagemRota");


const produtoAtivoRouter = require('./produtoAtivo')

const carrinhoRota = require('./rotaCarrinho')


router.use('', categoriaAtivaRouter);
router.use('', imagemRota)
router.use('',produtoAtivoRouter) 
router.use('', carrinhoRota)


module.exports = router;
