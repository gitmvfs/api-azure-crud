const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const auto_increment = async (modelo) => {
  try {
    // Ordena os documentos pelo índice de forma decrescente e limita a 1 para obter o último documento
    const result = await modelo.find().sort({ index: -1 }).limit(1).lean();

    let index = 1; // Valor padrão se não houver documentos no modelo

    if (result.length > 0) {
      // Se houver um documento, obtenha o índice do último documento e adicione 1
      index = result[0].index + 1;
    }

    return index;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

module.exports = auto_increment;