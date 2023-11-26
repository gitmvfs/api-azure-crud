const Produto = require('../models/produtos_ativos/produtosAtivosModelo');

async function autoIncrement(next) {
    const doc = this;
    if(!doc.pk_idProduto){
        try{
            const lastProduct = await Produto.findOne().sort('-pk_idProduto');
            const newProductId = lastProduct ? lastProduct.pk_idProduto + 1 : 1;
            doc.pk_idProduto = newProductId;

            next();
        } catch(err){
            return next(err);
        }
    } else {
        next();
    }
}


function capitalizeFields(next){
    const doc = this;

    // campos a serem capitalizados
    const fieldsToCapitalize = ['nome', 'descricao'];

    // capitaliza os valores na lista
    fieldsToCapitalize.forEach(field => {
        if(doc.isModified(field) && typeof doc[field] === 'string') {
            doc[field] = doc[field].charAt(0).toUpperCase() + doc[field].slice(1).toLowerCase();
        }
    });

    // verefica se o campo 'cor' é um array de strings e ,se for, capitaliza cada elemento
    if(doc.isModified('cor') && Array.isArray(doc.cor)) {
        doc.cor = doc.cor.map(color => typeof color === 'string' ? color.charAt(0).toUpperCase() + color.slice(1).toLowerCase() : color);
    }

    next();
}

module.exports = autoIncrement;
module.exports = capitalizeFields;