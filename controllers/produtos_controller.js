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
        doc.cor = doc.cor.map(color => typeof color === 'string' ? color.charAt(0).toLowerCase() + color.slice(1).toLowerCase() : color);
    }

    next();
}

module.exports = capitalizeFields;