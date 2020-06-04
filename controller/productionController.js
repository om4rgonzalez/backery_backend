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
}


module.exports = {
    startProduction
};