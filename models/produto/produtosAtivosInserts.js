const Produto = require('./produtosAtivosModelo')

function inserirProduto(pk_idProduto, nome, preco, genero, descricao, tamanho, cor, tipo, linkFoto1, linkFoto2, linkFoto3, categoria){

    const novoProduto = new Produto({
        pk_idProduto: pk_idProduto,
        nome: nome,
        preco: preco,
        genero: genero,
        descricao: descricao,
        tamanho: tamanho,
        cor: cor,
        tipo: tipo,
        linkFoto1:linkFoto1,
        linkFoto2:linkFoto2,
        linkFoto3:linkFoto3,
        categoria: categoria
    })

    novoProduto.save()

}

module.exports = inserirProduto