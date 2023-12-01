/**
 * @swagger
 * definitions:
 *   categoriaModelo:
 *     type: object
 *     properties:
 *       index:
 *         type: number
 *       nome:
 *         type: string
 *       descricao:
 *         type: string
 *       inicio:
 *         type: string
 *         format: date   
 *       fim:
 *         type: string
 *         format: date    
 *       img:
 *         type: string
 *    
 *   categoriaDelete:
 *     type: object
 *     properties:
 *       index:
 *         type: number
 *         
 */


/**
 * @swagger
 * /categoria:
 *   get:
 *     summary: Descrição resumida da rota
 *     description: Descrição mais detalhada da rota
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Sucesso
 *         schema:
 *           $ref: '#/definitions/categoriaModelo'
 *       500:
 *         description: Erro no banco de dados
 *         schema:
 *           $ref: '#/definitions/categoriaModelo'
 *   
 *   post:
 *     summary: Criar uma nova categoria .
 *     description: Endpoint para criar uma nova categoria ativa.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/categoriaModelo'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 *       400:
 *         description: Parâmetros inválidos.
 *       500:
 *         description: Erro no banco de dados.
 * 
 * 
 * 
 * /categoria/{categoriaIndex}:
 *   get:
 *     summary: Retorna uma categoria.
 *     description: Endpoint para retornar uma nova categoria pelo id.
 *     parameters:
 *       - in: path
 *         name: categoriaIndex
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria a ser obtida.
 *     responses:
 *       201:
 *         description: Categoria encontrada com sucesso.
 *       400:
 *         description: Parâmetros inválidos.
 *       500:
 *         description: Erro no banco de dados.
 * 
 *   delete:
 *     summary: Deleta uma categoria.
 *     description: Endpoint para deletar uma nova categoria pelo id.
 *     parameters:
 *       - in: path
 *         name: categoriaIndex
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria a ser obtida.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/categoriaDelete'
 *     responses:
 *       201:
 *         description: Categoria deletada com sucesso.
 *       400:
 *         description: Parâmetros inválidos.
 *       500:
 *         description: Erro no banco de dados.
 * 
 * 
 */

 
