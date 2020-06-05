const { Router } = require('express');
const router = Router();
const wrapperConnection = require('../data/wraperConnection');
const mysql = require('mysql2/promise');

startProduction = async(production) => {
    production.supplies.forEach(supply => {
        supply.quantity = supply.quantity * production.quantity;
    });
    utils.newProduction(production);
    return {
        ok: true,
        message: 'Produccion registrada'
    };
};



getProductionsByDate = async(start, end) => {
    let q = 'CALL PROC_LIST_PRODUCTION_BY_DATE("' + start + '", "' + end + '")';
    console.log(q);
    const [rows, fields] = await wrapperConnection.execute(q);
    let productions = [];
    let ok = true;
    let message = 'Return Data';
    if (rows[0].length > 0) {
        rows[0].forEach(production => {
            if (productions.length == 0) {
                productions.push({
                    productionId: production.PRODUCTION_ID,
                    uniteType: production.PRODUCTION_UNIT_TYPE,
                    quantity: production.PRODUCTION_QUANTITY,
                    productId: production.PRODUCT_ID,
                    productName: production.PRODUCT_NAME,
                    supplies: []
                });
            } else {
                if (productions.filter(p => p.productionId == production.PRODUCTION_ID).length == 0) {
                    productions.push({
                        productionId: production.PRODUCTION_ID,
                        uniteType: production.PRODUCTION_UNIT_TYPE,
                        quantity: production.PRODUCTION_QUANTITY,
                        productId: production.PRODUCT_ID,
                        productName: production.PRODUCT_NAME,
                        supplies: []
                    });
                }
            }
        });
        productions.forEach(production => {
            rows[0].forEach(supply => {
                if (production.productionId == supply.PRODUCTION_ID) {
                    if (production.supplies.length == 0) {
                        production.supplies.push({
                            productionDetailId: supply.PRODUCTION_DETAILL_ID,
                            unitType: supply.SUPPLY_UNIT_TYPE,
                            quantity: supply.SUPPLY_QUANTITY,
                            supplyName: supply.SUPPLY_NAME,
                            supplyId: supply.SUPPLY_ID
                        });
                    } else {
                        if (production.supplies.filter(s => s.productionDetailId == supply.PRODUCTION_DETAILL_ID).length == 0) {
                            production.supplies.push({
                                productionDetailId: supply.PRODUCTION_DETAILL_ID,
                                unitType: supply.SUPPLY_UNIT_TYPE,
                                quantity: supply.SUPPLY_QUANTITY,
                                supplyName: supply.SUPPLY_NAME,
                                supplyId: supply.SUPPLY_ID
                            });
                        }
                    }
                }

            });
        });
    } else {
        ok = false;
        message = 'No hay produccion a mostrar en el periodo que buscas';
    }


    return {
        ok,
        message,
        productions
    };

};

getTotalUSedSupplies = async(start, end) => {
    let q = 'CALL PROC_LIST_TOTAL_SUPPLIES_USED("' + start + '", "' + end + '")';
    console.log(q);
    const [rows, fields] = await wrapperConnection.execute(q);
    let supplies = [];
    let ok = true;
    let message = 'Returning Data';
    if (rows[0].length > 0) {
        rows[0].forEach(supply => {
            supplies.push({
                supplyId: supply.SUPPLY_ID,
                supplyName: supply.SUPPLY_NAME,
                unitType: supply.UNIT_TYPE,
                quantity: supply.QUANTITY
            });
        });
    } else {
        ok = false;
        message = 'No hubo produccion en el periodo buscado';
    }


    return {
        ok,
        message,
        supplies
    };
};

getSuppliesConsumedByProductByPeriod = async(start, end, supplyId) => {
    let q = 'CALL PROC_LIST_QUANTITY_CONSUMED_BY_PRODUCT("' + start + '", "' + end + '", ' + supplyId + ')';
    console.log(q);
    const [rows, fields] = await wrapperConnection.execute(q);
    let consumed = [];
    let ok = true;
    let message = 'Returning Data';
    if (rows[0].length > 0) {
        let total = 0;
        rows[0].forEach(s => {
            total += Number(s.QUANTITY);
        });
        rows[0].forEach(supply => {
            consumed.push({
                productId: supply.PRODUCT_ID,
                productName: supply.PRODUCT_NAME,
                unitType: supply.UNIT_TYPE,
                quantity: supply.QUANTITY,
                percent: (supply.QUANTITY / total).toFixed(2)
            });
        });
    } else {
        ok = false;
        message = 'No hubo produccion en el periodo buscado';
    }


    return {
        ok,
        message,
        consumed
    };
};








var utils = {
    async newProduction(production) {
        let q = 'CALL PROC_NEW_PRODUCTION(' + production.product.productId + ',"' + production.product.unitType + '", ' + production.quantity + ')';
        let [rows, fields] = await wrapperConnection.execute(q);
        production.supplies.forEach(supply => {
            utils.addSupply(rows[0][0].ID, supply);
        });
        return true;
    },
    addSupply(productionId, supply) {
        let q = 'CALL PROC_ADD_SUPPLY_TO_PRODUCTION(' + supply.supplyId + ', "' + supply.unitType + '", ' + supply.quantity + ', ' + productionId + ')';
        console.log(q);
        wrapperConnection.execute(q);
        return true;
    }
};







module.exports = {
    startProduction,
    getProductionsByDate,
    getTotalUSedSupplies,
    getSuppliesConsumedByProductByPeriod
};