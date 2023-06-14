const statement = require('../statementMariaDB.js');
const fs = require('fs');

class operacion {
    userConnetion;
    constructor(usuarioConexion) {
        this.userConnetion = usuarioConexion;
    }

    grabarCargasPlanta(datosJSON) {
        return new Promise((resolve, reject) => {
            try {
                let statementConsumo = new statement(this.userConnetion);
                var sql = "CALL spGrabarCargasPlanta" + "('" + JSON.stringify(datosJSON) + "')";
                statementConsumo.query(sql, (ok, data, error) => {
                    if (ok){
                        resolve(data[0]);
                    }else{
                        reject(error);
                    };
                    return;
                });
    
            } catch (error) {
                reject(error);
                return;
            };
        });
    };
};

module.exports = operacion;