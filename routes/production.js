const bodyParser = require('body-parser'); //bodyParser nos permite reicibir parametros por POST
const { Router } = require('express');
const router = Router();
const productionController = require('../controller/productionController');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());

router.post('/production/', async function(req, res) {
    let response = await productionController.startProduction(req.body.production);
    res.json(response);
});

router.get('/production', async function(req, res) {
    let response = await productionController.getProductionsByDate(req.query.start + ' 00:00:00', req.query.end + '23:59:59');
    res.json(response);
});

router.get('/production/used_supplies', async function(req, res) {
    let response = await productionController.getTotalUSedSupplies(req.query.start + ' 00:00:00', req.query.end + '23:59:59');
    res.json(response);
});

router.get('/production/consumed_supplies', async function(req, res) {
    let response = await productionController.getSuppliesConsumedByProductByPeriod(req.query.start + ' 00:00:00', req.query.end + '23:59:59', req.query.supplyId);
    res.json(response);
});








module.exports = router;