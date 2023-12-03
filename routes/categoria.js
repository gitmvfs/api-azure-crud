const router = require("express").Router();
const categoriaModelo = require("../models/categoria/schema");
const mongoose = require("mongoose");
const auto_increment = require("../controllers/auto_increment");

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

  .get("/categoria/quantidade/:quantidade([0-9]+)", (req, res) => {
    try {
      categoriaModelo.find()
      .limit(req.params.quantidade)
      .then((resultado) => {
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
    try {
      let index = new Number(await auto_increment(categoriaModelo));

      const nome = new String(req.body.nome);
      const descricao = new String(req.body.descricao);
      const inicio = new Date(req.body.inicio);
      const fim = new Date(req.body.fim);
      const img = new String(req.body.img);

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

      const resultado = await novaCategoria.save();
      res.status(201).json("Categoria cadastrada com sucesso");
    } catch (error) {
      if (error.name === "ValidationError") {
        // Erros de validação
        const validationErrors = {};

        // Mapeia os erros para um objeto
        for (const key in error.errors) {
          validationErrors[key] = error.errors[key].message;
        }

        res.status(400).json({ errors: validationErrors });
      } else if (error.code === 11000) {
        // Erro de chave duplicada (por exemplo, índice único)
        res.status(400).json({ error: "Duplicidade de chave única" });
      } else if (error instanceof mongoose.CastError) {
        // Erro de tipo (por exemplo, tentativa de converter um valor para um tipo específico)
        res.status(400).json({ error: "Erro de tipo: " + error.message });
      } else {
        // Outros erros
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
      }
    }
  })

  .put("/categoria/:id", async (req, res) => {
    try {

      const nome = new String(req.body.nome);
      const descricao = new String(req.body.descricao);
      const inicio = new Date(req.body.inicio);
      const fim = new Date(req.body.fim);
      const img = new String(req.body.img);

      inicio.setDate(inicio.getDate() + 1);
      fim.setDate(fim.getDate() + 1);

      const novaCategoria = {
        nome: nome,
        descricao: descricao,
        inicio: inicio,
        fim: fim,
        img: img,
      };

      const resultado = await categoriaModelo.findOneAndUpdate({index:req.params.id}, novaCategoria, {new: true});
      res.status(201).json("Categoria atualizada com sucesso");
    } catch (error) {
      if (error.name === "ValidationError") {
        // Erros de validação
        const validationErrors = {};

        // Mapeia os erros para um objeto
        for (const key in error.errors) {
          validationErrors[key] = error.errors[key].message;
        }

        res.status(400).json({ errors: validationErrors });
      } else if (error.code === 11000) {
        // Erro de chave duplicada (por exemplo, índice único)
        res.status(400).json({ error: "Duplicidade de chave única" });
      } else if (error instanceof mongoose.CastError) {
        // Erro de tipo (por exemplo, tentativa de converter um valor para um tipo específico)
        res.status(400).json({ error: "Erro de tipo: " + error.message });
      } else {
        // Outros erros
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
      }
    }
  })

  .delete("/categoria/:id", (req, res) => {
    try {
      categoriaModelo
        .deleteOne({ index: req.params.id })
        .then((resultado) => {

          if(resultado.deletedCount > 0 ){
             res.status(200).json({ "Categoria deletada com sucesso": resultado });
          }
          else{
            res.status(404).json("Categoria não encontrada")
          }
        })
        .catch((erro) => {
          if(erro instanceof mongoose.CastError){
            res.status(400).json({ "Parametro inválido, verifique o id": erro });
          }
        });
    } catch {
      res.status(500).json({ "Erro interno do servidor": erro });
    }
  });

module.exports = router;
