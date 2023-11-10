const express = require('express');
const multer = require('multer');
const azureStorage = require('azure-storage');
const { Readable } = require('stream'); // Adicione esta linha
const app = express();


// Configuração do Multer para o upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//
const String_azure = "DefaultEndpointsProtocol=https;AccountName=gllmm;AccountKey=nxK+oZN4lM0hu+4qHex8/6yOaOAeArO1MJYClEDbQJP1q5UM0oBhWjnAaQ0LfZv/Y04IFSpTbKZl+AStm0EDNQ==;EndpointSuffix=core.windows.net" 

// Configuração do cliente Azure Blob Storage
const blobService = azureStorage.createBlobService(String_azure);
const containerName = 'imagens';  // Substitua com o nome do seu container no Azure Blob Storage

// Rota de upload
app.post('/upload', upload.array('images'), (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }

    // Pega cada arquivo mandado pelo formulário e cria uma promisse
  const uploadPromises = files.map(file => {
    const blobName = file.originalname;
    const stream = new Readable();
    stream.push(file.buffer);
    stream.push(null);
  
    const options = {
      contentSettings: {
        contentType: file.mimetype, // Usa o tipo MIME fornecido pelo multer
      },
    };

    //Caso a promisse tenha sido feita corretamente, ele tenta enviar para o azure
    return new Promise((resolve, reject) => {
      blobService.createBlockBlobFromStream(containerName, blobName, stream, file.size, options, (error, result, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  });
  

  // Aguarda todos os uploads concluírem
  Promise.all(uploadPromises)
    .then(results => {
      res.json({ success: true, results });
    })
    .catch(error => {
      console.error('Erro no upload para o Azure Blob Storage:', error);
      res.status(500).json({ success: false, error: error.message });
    });
});

// Inicia o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
