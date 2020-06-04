const bodyParser = require('body-parser');
const { Router } = require('express');
const router = Router();
const mysqlConnection = require('../data/datamanager');
const wrapperConnection = require('../data/wraperConnection');
const mysql = require('mysql2/promise');

newProduct = async(product) => {

};

getProducts = async() => {
    let q = 'CALL PROC_LIST_PRODUCTOS_PROCESS_SUPPLY()';
    console.log(q);
    const [rows, fields] = await wrapperConnection.execute(q);
    let products = [];
    utils.setProduct(products, rows[0]);
    products.forEach(product => {
        utils.setElaboration(product, rows[0]);
    });
    products.forEach(product => {
        product.elaborations.forEach(elaboration => {
            //set process
            utils.setProcess(elaboration, rows[0]);
            //set supplies
            utils.setSuplly(elaboration, rows[0]);
        });
    });


    return {
        ok: true,
        message: 'Devolviendo datos',
        products
    };
}












var utils = {
    setProduct(products, rows) {
        rows.forEach(element => {
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
    },
    setElaboration(product, rows) {
        rows.forEach(element => {
            if (product.productId == element.PRODUCT_ID) {
                if (product.elaborations.length == 0) {
                    product.elaborations.push({
                        elaborationId: element.ELABORATION_ID,
                        elaborationName: element.ELABORATION_NAME,
                        process: [],
                        supplies: []
                    });
                } else {
                    if (product.elaborations.filter(elaboration => elaboration.elaborationId == element.ELABORATION_ID).length == 0) {
                        product.elaborations.push({
                            elaborationId: element.ELABORATION_ID,
                            elaborationName: element.ELABORATION_NAME,
                            process: [],
                            supplies: []
                        });
                    }
                }
            }
        });
    },
    setProcess(elaboration, rows) {
        rows.forEach(element => {
            if (elaboration.elaborationId == element.ELABORATION_ID) {
                if (elaboration.process.length == 0) {
                    elaboration.process.push({
                        processId: element.PROCESS_ID,
                        workingUnit: element.WORKING_UNIT,
                        workingValue: element.WORKING_VALUE,
                        processName: element.PROCESS_NAME
                    });
                } else {
                    if (elaboration.process.filter(process => process.processId == element.PROCESS_ID).length == 0) {
                        elaboration.process.push({
                            processId: element.PROCESS_ID,
                            workingUnit: element.WORKING_UNIT,
                            workingValue: element.WORKING_VALUE,
                            processName: element.PROCESS_NAME
                        });
                    }
                }
            }

        });
    },
    setSuplly(elaboration, rows) {
        rows.forEach(element => {
            if (elaboration.elaborationId == element.ELABORATION_ID) {
                if (elaboration.supplies.length == 0) {
                    elaboration.supplies.push({
                        supplyId: element.SUPPLY_ID,
                        supplyName: element.SUPPLY_NAME,
                        measureUnit: element.MEASURE_UNIT,
                        measureValue: element.MEASURE_VALUE
                    });
                } else {
                    if (elaboration.supplies.filter(supply => supply.supplyId == element.SUPPLY_ID).length == 0) {
                        elaboration.supplies.push({
                            supplyId: element.SUPPLY_ID,
                            supplyName: element.SUPPLY_NAME,
                            measureUnit: element.MEASURE_UNIT,
                            measureValue: element.MEASURE_VALUE
                        });
                    }
                }
            }

        });
    }
}




module.exports = {
    newProduct,
    getProducts
};