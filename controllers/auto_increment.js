const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const auto_increment = async (modelo) => {
  try {

    const result = await modelo.find().lean();
    const index = result.length;
    console.log(result)
    console.log(index)

    return index;
  

  } catch (error) {

    console.error("Error:", error);
    throw error;
  
}
};

module.exports = auto_increment;
