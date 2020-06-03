const bodyParser = require('body-parser');
const { Router } = require('express');
const router = Router();
const mysqlConnection = require('../data/datamanager');
const wrapperConnection = require('../data/wraperConnection');
const mysql = require('mysql2/promise');

router.get('/products', await
    function(req, res) {
        let q = 'CALL PROC_LIST_PRODUCTOS_PROCESS_SUPPLY()';
        console.log(q);
        const [rows, fields] = await wrapperConnection.execute(q);
        let products = [];
        //get the products
        rows[0].forEach(element => {
            if (products.length == 0) {
                products.push({
                    productId: element.PRODUCT_ID,
                    productName: element.PRODUCT_NAME,
                    description: element.DESCRIPTION,
                    elaborations: []
                });
            } else {
                if (products.filter(product => product.productId == element.PRODUCT_ID).length == 0) {
                    products.push({
                        productId: element.PRODUCT_ID,
                        productName: element.PRODUCT_NAME,
                        description: element.DESCRIPTION,
                        elaborations: []
                    });
                }
            }
        });

        //set elaboration
        products.forEach(product => {
            rows[0].forEach(element => {
                if (product.productId == element.PRODUCT_ID) {
                    if (product.elaborations.length == 0) {
                        product.elaborations.push({
                            elaborationId: element.ELABORATION_ID,
                            elaborationName: element.ELABORATION_NAME,
                            process: [],
                            supplies: []
                        });
                    } else {
                        if (products.elaborations.filter(elaboration => elaboration.elaborationId == element.ELABORATION_ID).length == 0) {
                            product.elaborations.push({
                                elaborationId: element.ELABORATION_ID,
                                elaborationName: element.ELABORATION_NAME,
                                process: [],
                                supplies: []
                            });
                        }
                    }
                }
            })
        });

        //set process

        res.json({
            ok: true,
            message: 'Devolviendo datos',
            products
        });
    });







module.exports = router;