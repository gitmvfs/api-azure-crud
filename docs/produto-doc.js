/**
 * @swagger
 * tags:
 *   - name: Produto
 *     description: Operações relacionadas a produtos
 * 
 * definitions:
 *  produtoModelo:
 *     type: object
 *     properties:
 *       index:
 *         type: integer
 *         format: int32
 *         uniqueItems: true
 *       nome:
 *         type: string
 *         uniqueItems: true
 *       preco:
 *         type: number
 *       genero:
 *         type: string
 *         enum:
 *           - masculino
 *           - feminino
 *           - unissex
 *       descricao:
 *         type: string
 *       tamanhos:
 *         type: array
 *         items:
 *           type: string
 *           enum:
 *             - PP
 *             - P
 *             - M
 *             - G
 *             - GG
 *             - XGG
 *       cor:
 *         type: string
 *       tipo:
 *         type: string
 *         enum:
 *           - vestido
 *           - macacão
 *           - calça
 *           - blusa
 *           - camisa
 *           - blazer
 *           - paletó
 *       linkFoto1:
 *         type: string
 *       linkFoto2:
 *         type: string
 *       linkFoto3:
 *         type: string
 *       categoriaNome:
 *         type: string
 *         description: Nome da categoria a ser vinculada
 *    
 *  
  
 * /produto:
 *   post:
 *     tags:
 *       - Produto
 *     summary: Criar um novo produto.
 *     description: Endpoint para criar um novo produto .
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/produtoModelo'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso.
 *       400:
 *         description: Parâmetros inválidos.
 *       500:
 *         description: Erro no banco de dados.
 *
 *   get:
 *     tags:
 *       - Produto
 *     summary: Descrição resumida da rota.
 *     description: Descrição mais detalhada da rota.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Sucesso
 *         schema:
 *           $ref: '#/definitions/produtoModelo'
 *       500:
 *         description: Erro no banco de dados
 *         schema:
 *           $ref: '#/definitions/produtoModelo'
 *   
 * /produto/quantidade/{quantidade}:
 *   get:
 *     tags:
 *       - Produto
 *     summary: Retorna uma certa quantidade de produtos.
 *     description: Endpoint para retornar varios protudos de acordo com a quantidade.
 *     parameters:
 *       - in: path
 *         name: quantidade
 *         required: true
 *         schema:
 *           type: number
 *         description: Quantidade de produtos a retornar.
 *     responses:
 *       201:
 *         description: Produto encontrada com sucesso.
 *       400:
 *         description: Parâmetros inválidos.
 *       500:
 *         description: Erro no banco de dados.
 * 
 * /produto/{produtoIndex}:
 *   get:
 *     tags:
 *       - Produto
 *     summary: Retorna umm produto.
 *     description: Endpoint para retornar uma nova produto pelo id.
 *     parameters:
 *       - in: path
 *         name: produtoIndex
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do produto a ser obtida.
 *     responses:
 *       201:
 *         description: Produto encontrada com sucesso.
 *       400:
 *         description: Parâmetros inválidos.
 *       500:
 *         description: Erro no banco de dados.
 * 
 *   put:
 *     tags:
 *       - Produto
 *     summary: Deleta um produto.
 *     description: Endpoint para deletar uma nova produto pelo id.
 *     parameters:
 *       - in: path
 *         name: produtoIndex
 *         required: true
 *         schema:
 *           type: number
 *         description: ID da protudo a ser obtida.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/produtoModelo'
 *     responses:
 *       201:
 *         description: Produto atualizada com sucesso.
 *       400:
 *         description: Parâmetros inválidos.
 *       500:
 *         description: Erro no banco de dados.
 * 
 *   delete:
 *     tags:
 *       - Produto
 *     summary: Deleta um produto.
 *     description: Endpoint para deletar uma nova produto pelo id.
 *     parameters:
 *       - in: path
 *         name: produtoIndex
 *         required: true
 *         schema:
 *           type: number
 *         description: ID da produto para deletar.
 *     responses:
 *       201:
 *         description: Produto deletado com sucesso.
 *       400:
 *         description: Parâmetros inválidos.
 *       500:
 *         description: Erro no banco de dados.
 */
