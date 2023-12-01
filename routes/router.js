const router = require('express').Router();

const categoriaAtivaRouter = require('./categoriaAtiva');
const imagemRota = require("./imagemRota");
const loginUser = require('./LoginUser')
const loginAdmin = require('./LoginAdm')
const register = require('./Register')

const produtoAtivoRouter = require('./produtoAtivo')

router.use('', categoriaAtivaRouter);
router.use('', categoriaOcultaRouter);
router.use('', imagemRota);
router.use('',produtoAtivoRouter); 
router.use('', loginUser);
router.use('', loginAdmin);
router.use('', register);


module.exports = router;
