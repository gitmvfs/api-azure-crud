const router = require("express").Router();
const categoriaModelo = require("../models/categoria/schema");
const mongoose = require("mongoose")

router

  // Pega todas as categorias

  .get("/categoria", (req, res) => {
    try {
      categoriaModelo.find().then((resultado) => {
        if (resultado.length > 0) {
          res.status(200).send(resultado);
        } else {
          res.status(200).json("Banco vazio");
        }
      });
    } catch {
      res.status(500).json("Erro interno.");
    }
  })

  // Pega pelo id

  .get("/categoria/:id", (req, res) => {
    try {
      categoriaModelo.find({ index: req.params.id }).then((resultado) => {
        if (resultado.length > 0) {
          res.status(200).send(resultado);
        } else {
          res.status(200).json("Banco vazio");
        }
      });
    } catch {
      res.status(500).json("Erro interno.");
    }
  })

// Cadastra uma nova categoria

  .post("/categoria", async (req, res) => {
    let index = await auto_increment(categoriaModelo);

    try {
      const nome = req.body.nome;
      const descricao = req.body.descricao;
      const inicio = new Date(req.body.inicio);
      const fim = new Date(req.body.fim);
      const img = req.body.img;

      inicio.setDate(inicio.getDate() + 1);
      fim.setDate(fim.getDate() + 1);

      const novaCategoria = new categoriaModelo({
        index: index,
        nome: nome,
        descricao: descricao,
        inicio: inicio,
        fim: fim,
        img: img,
      });

      //criando a resposta para enviar pro banco
      novaCategoria
        .save()
        .then((resultado) => {
          res.json(" Cadastrado com sucesso " + resultado).status(201);
        })
        .catch((err) => {
          res.json({ err: err }).status(400);
        });
    } catch (error) {
      console.log(error);
    }
  })

.put("/categoria/:id", async (req, res) => {
    
    let index = await auto_increment(categoriaModelo);

    try {
      const nome = req.body.nome;
      const descricao = req.body.descricao;
      const inicio = new Date(req.body.inicio);
      const fim = new Date(req.body.fim);
      const img = req.body.img;

      inicio.setDate(inicio.getDate() + 1);
      fim.setDate(fim.getDate() + 1);

      const categoriaAtt = new categoriaModelo({
        index: index,
        nome: nome,
        descricao: descricao,
        inicio: inicio,
        fim: fim,
        img: img,
      });
    }
    catch{
        res.status(400).json("Parametros inválidos")
    }
    try{

    //criando a resposta para enviar pro banco
      categoriaModelo.findOneAndUpdate({index: req.params.id}, categoriaAtt ,{new: true})
      .then((resultado) => {
         
        res.status(201).json({"Atualizado com sucesso: ": resultado})

      })
      .catch((erro) =>{
      
        res.status(500).json({"Erro desconhecido: ": erro})
      
    })
    }
    catch{
    
        res.status(500).json({"Erro desconhecido: ": erro})
   
    }


})

.delete('/categoria/:id',(req,res) => {

    try{
        categoriaModelo.deleteOne({index:req.params.id})
        .then((resultado) =>{

            res.status(200).json({"Categoria deletada com sucesso": resultado})
        })
        .catch((erro) =>{

            res.status(500).json({"Erro interno do servidor": erro})
        })
    
    }
    catch{
       
        res.status(500).json({"Erro interno do servidor": erro})

    }

})



module.exports = router;
