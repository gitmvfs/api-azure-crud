const adminModelo = require("../models/admin/schema")
const {gerarToken}  = require('../controllers/token');
const router = require("express").Router()
const controller_login = require("../controllers/login_controller")

router.post("/admin/login", async(req,res) => {

    try{
    const email_admin = req.body.email
    const senha_admin = req.body.senha

    let resultado_login = await controller_login(email_admin,senha_admin,adminModelo)

    switch (resultado_login) {
        case 200:
            
           let token = await gerarToken(email_admin)
            res.status(200).json(token)
            break;
        
        case 401:
            res.status(401).json("Senha incorreta")
            break
        case 404:
            res.status(404).json("Usuario incorreto")
            break
        default:
            res.status(500).json("Internal server erro")
            break;
    }
}
catch(erro){
    res.status(500).json("internal server erro: " + erro)
}

})

module.exports = router