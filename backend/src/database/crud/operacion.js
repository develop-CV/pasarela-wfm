const statement = require('../statementMariaDB.js');
const fs = require('fs');

class operacion {
    userConnetion;
    constructor(usuarioConexion) {
        this.userConnetion = usuarioConexion;
    }

    grabarCargasPlanta(datosJSON, callback) {
        try {
            let statementConsumo = new statement(this.userConnetion);
            var sql = "CALL spGrabarCargasPlanta" + "('" + JSON.stringify(datosJSON) + "')";
            statementConsumo.query(sql, (ok, data, error) => {
                callback(ok, data[0], error);
                return;
            });

        } catch (error) {
            console.log(error);
            callback(false, [], error);
            return;
        };
    };
};

module.exports = operacion;