const router = require("express").Router();
const produtoModelo = require("../models/produto/schema");
const mongoose = require("mongoose");
const auto_increment = require("../controllers/auto_increment");
const categoriaModelo = require("../models/categoria/schema")

router

  .get("/produto", (req, res) => {
    try {
      produtoModelo.find().then((resultado) => {
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

  .get("/produto/quantidade/:quantidade([0-9]+)", (req, res) => {
    try {
      produtoModelo
        .find()
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

  .get("/produto/:id", (req, res) => {
    try {
      produtoModelo.find({ index: req.params.id }).then((resultado) => {
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

  .post("/produto", async (req, res) => {
    try {
      let index = await auto_increment(produtoModelo);

      const nome = new String(req.body.nome);
      const preco = new String(req.body.preco);
      const genero = new String(req.body.genero);
      const descricao = new String(req.body.descricao);
      const tamanhos = req.body.tamanhos.map(String);
      const cor = new String(req.body.cor);
      const tipo = new String(req.body.tipo);
      const linkFoto1 = new String(req.body.linkFoto1);
      const linkFoto2 = new String(req.body.linkFoto2);
      const linkFoto3 = new String(req.body.linkFoto3);
      const categoriaNome = new String(req.body.categoriaNome);

      const novoProduto = new produtoModelo({
        index: index,
        nome: nome,
        preco: preco,
        genero: genero,
        descricao: descricao,
        tamanhos: tamanhos,
        cor: cor,
        tipo: tipo,
        linkFoto1: linkFoto1,
        linkFoto2: linkFoto2,
        linkFoto3: linkFoto3,
        fk_categoria: categoriaNome,
      });

      const resultado = await novoProduto.save();
      res.status(201).json("Produto cadastrado com sucesso");
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

  .put("/produto/:id", async (req, res) => {
    try {

      const nome = new String(req.body.nome);
      const preco = new String(req.body.preco);
      const genero = new String(req.body.genero);
      const descricao = new String(req.body.descricao);
      const tamanhos = req.body.tamanhos.map(String);
      const cor = new String(req.body.cor);
      const tipo = new String(req.body.tipo);
      const linkFoto1 = new String(req.body.linkFoto1);
      const linkFoto2 = new String(req.body.linkFoto2);
      const linkFoto3 = new String(req.body.linkFoto3);
      const categoriaNome = new String(req.body.categoriaNome);

      const novoProduto = {

        nome: nome,
        preco: preco,
        genero: genero,
        descricao: descricao,
        tamanhos: tamanhos,
        cor: cor,
        tipo: tipo,
        linkFoto1: linkFoto1,
        linkFoto2: linkFoto2,
        linkFoto3: linkFoto3,
        fk_categoria: categoriaNome,
      };

      const resultado = await produtoModelo.findOneAndUpdate(
        { index: req.params.id },
        novoProduto,
        { new: true }
      );
      res.status(201).json("Produto atualizado com sucesso");
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

  .delete("/produto/:id", (req, res) => {
    try {
      produtoModelo
        .deleteOne({ index: req.params.id })
        .then((resultado) => {
          if (resultado.deletedCount > 0) {
            res.status(200).json({ "Produto deletado com sucesso": resultado });
          } else {
            res.status(404).json("Produto não encontrado");
            console.log(resultado)
          }
        })
        .catch((erro) => {
          if (erro instanceof mongoose.CastError) {
            res
              .status(400)
              .json({ "Parametro inválido, verifique o id": erro });
          }
        });
    } catch {
      res.status(500).json({ "Erro interno do servidor": erro });
    }
  });

module.exports = router;
