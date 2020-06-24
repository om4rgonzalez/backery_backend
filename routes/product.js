const bodyParser = require('body-parser'); //bodyParser nos permite reicibir parametros por POST
const { Router } = require('express');
const router = Router();
const productController = require('../controller/productController');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());

/**
 * @swagger
 * /products:
 *  get:
 *    tag:
 *    - product
 *    description: Return all products made by the bakery
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/products', async function(req, res) {
    console.log('Llega la peticion a get products');
    let response = await productController.getProducts();
    res.json(response);
});








module.exports = router;