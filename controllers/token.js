const jwt = require('jsonwebtoken')

const secretKey = 'loginJWT'

function gerarToken(email) {
    return jwt.sign({ email: email }, secretKey, { algorithm: 'HS256' })
}

module.exports = {
    gerarToken,
}