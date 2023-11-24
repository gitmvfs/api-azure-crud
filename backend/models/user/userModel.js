const mongoose = require('mongoose')

const User = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    senha: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
        require: false,
        unique: true,
        trim: true
    }
});

const saveToken = ((token) => {
    this.token = token;
    return this.save();
})

module.exports = mongoose.model('user',User), saveToken;