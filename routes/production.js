const bodyParser = require('body-parser'); //bodyParser nos permite reicibir parametros por POST
const { Router } = require('express');
const router = Router();
const productionController = require('../controller/productionController');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());

/**
 * @swagger
 * /production/:
 *  get:
 *    tag:
 *    - production
 *    description: Start the production for a product
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/production/', async function(req, res) {
    console.log('Llega la peticion para iniciar la produccion');
    console.log(req.body);
    let response = await productionController.startProduction(req.body.production);
    res.json(response);
});

router.get('/production', async function(req, res) {
    let response = await productionController.getProductionsByDate(req.query.start + ' 00:00:00', req.query.end + ' 23:59:59');
    res.json(response);
});

router.get('/production/used_supplies', async function(req, res) {
    let response = await productionController.getTotalUSedSupplies(req.query.start + ' 00:00:00', req.query.end + ' 23:59:59');
    res.json(response);
});

router.get('/production/consumed_supplies', async function(req, res) {
    let response = await productionController.getSuppliesConsumedByProductByPeriod(req.query.start + ' 00:00:00', req.query.end + ' 23:59:59', req.query.supplyId);
    res.json(response);
});








module.exports = router;