/**
 * @swagger
 * tags:
 *   - name: Produto
 *     description: Operações relacionadas a produtos
 *   - name: Categoria
 *     description: Operações relacionadas a categorias
 * 
 * definitions:
 *   categoriaModelo:
 *     type: object
 *     properties:
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
 * /categoria:
 *   post:
 *     tags:
 *       - Categoria
 *     summary: Criar uma nova categoria.
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
 *   get:
 *     tags:
 *       - Categoria
 *     summary: Descrição resumida da rota.
 *     description: Descrição mais detalhada da rota.
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
 * /categoria/quantidade/{quantidade}:
 *   get:
 *     tags:
 *       - Categoria
 *     summary: Retorna uma certa quantidade de categorias.
 *     description: Endpoint para retornar uma nova categoria pelo id.
 *     parameters:
 *       - in: path
 *         name: quantidade
 *         required: true
 *         schema:
 *           type: number
 *         description: ID da categoria a ser obtida.
 *     responses:
 *       201:
 *         description: Categoria encontrada com sucesso.
 *       400:
 *         description: Parâmetros inválidos.
 *       500:
 *         description: Erro no banco de dados.
 * 
 * /categoria/{categoriaIndex}:
 *   get:
 *     tags:
 *       - Categoria
 *     summary: Retorna uma categoria.
 *     description: Endpoint para retornar uma nova categoria pelo id.
 *     parameters:
 *       - in: path
 *         name: categoriaIndex
 *         required: true
 *         schema:
 *           type: number
 *         description: ID da categoria a ser obtida.
 *     responses:
 *       201:
 *         description: Categoria encontrada com sucesso.
 *       400:
 *         description: Parâmetros inválidos.
 *       500:
 *         description: Erro no banco de dados.
 * 
 *   put:
 *     tags:
 *       - Categoria
 *     summary: Deleta uma categoria.
 *     description: Endpoint para deletar uma nova categoria pelo id.
 *     parameters:
 *       - in: path
 *         name: categoriaIndex
 *         required: true
 *         schema:
 *           type: number
 *         description: ID da categoria a ser obtida.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/categoriaModelo'
 *     responses:
 *       201:
 *         description: Categoria atualizada com sucesso.
 *       400:
 *         description: Parâmetros inválidos.
 *       500:
 *         description: Erro no banco de dados.
 * 
 *   delete:
 *     tags:
 *       - Categoria
 *     summary: Deleta uma categoria.
 *     description: Endpoint para deletar uma nova categoria pelo id.
 *     parameters:
 *       - in: path
 *         name: categoriaIndex
 *         required: true
 *         schema:
 *           type: number
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
 */
