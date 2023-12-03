const router = require("express").Router();

const blob_azure = require("../controllers/blob_azure");

// Biblioteca para aceitar arquivos de mídia
const multer = require("multer");

// Configuração do Multer para o upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rota de upload

router.post("/imagem", upload.array("images"), (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).send("Nenhum arquivo enviado.");
  } else {
    const uploadPromises = blob_azure(files);

    // Aguarda todos os uploads concluírem
    Promise.all(uploadPromises)
      .then((imageUrls) => {
        res.json(imageUrls).status(200);
      })
      .catch((error) => {
        console.error("Erro no upload para o Azure Blob Storage:", error);
        res.status(500).json({ success: false, error: error.message });
      });
  }
});

module.exports = router;
