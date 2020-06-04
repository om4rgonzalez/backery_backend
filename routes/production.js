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







module.exports = router;