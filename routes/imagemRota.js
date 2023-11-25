const router = require('express').Router();

const express = require('express');
const inserir_fotos = require("../controllers/inserir_fotos")

// Biblioteca para aceitar arquivos de mídia
const multer = require('multer');

// Configuração do Multer para o upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Rota de upload

const imagemRota = {

    create: (req, res, ) => {        
      const files = req.files;
    
      if (!files || files.length === 0) {
      
        return res.status(400).send('Nenhum arquivo enviado.');
      
      }
      else{
      
      const uploadPromises = inserir_fotos(files)
        
        // Aguarda todos os uploads concluírem
        Promise.all(uploadPromises)
        .then(results => {
          
          res.json({ success: true, results }).status(200);
        
        })

        .catch(error => {
          console.error('Erro no upload para o Azure Blob Storage:', error);
          res.status(500).json({ success: false, error: error.message });
        
        });
      }
    }
}


router.route("/imagem/inserir").post(upload.array('images'), (req,res) => imagemRota.create(req,res))

module.exports = router;