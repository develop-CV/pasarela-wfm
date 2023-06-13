const statement = require('../statementMariaDB.js');

class maestros{
    userConnetion;
    constructor(usuarioConexion){
        this.userConnetion = usuarioConexion;
    }

    consultaTiposIdentificacion(idTipoIdentificacion, callback){
        try {
            var sql = "CALL spConsultarTiposIdentificacion";
            if (idTipoIdentificacion > 0){
                sql = sql + "(" + idTipoIdentificacion.toString() + ")";
            }else{
                sql = sql + "(0)";
            };
            
            let statementConsumo = new statement(this.userConnetion);
            statementConsumo.query(sql, (ok, data, error) => {
                callback(ok, data[0], error);
                return;
            });
        } catch (error) {
            callback(false, [], error);
            return;
        };
    };

    consultarServiciosHorarios(idServicioHorario, callback){
        try {
            var sql = "CALL spConsultarServiciosHorarios";
            if (idServicioHorario > 0){
                sql = sql + "(" + idServicioHorario.toString() + ")";
            }else{
                sql = sql + "(0)";
            };
            
            let statementConsumo = new statement(this.userConnetion);
            statementConsumo.query(sql, (ok, data, error) => {
                callback(ok, data[0], error);
                return;
            });
        } catch (error) {
            callback(false, [], error);
            return;
        };
    };

    consultaServicios(idServicio, callback){
        try {
            var sql = "CALL spConsultarServicios";
            if (idServicio > 0){
                sql = sql + "(" + idServicio.toString() + ")";
            }else{
                sql = sql + "(0)";
            };
            
            let statementConsumo = new statement(this.userConnetion);
            statementConsumo.query(sql, (ok, data, error) => {
                callback(ok, data[0], error);
                return;
            });
        } catch (error) {
            callback(false, [], error);
            return;
        };
    };

    updateServiciosHorarios(datosServiciosHorarios, callback){
        let statementConsumo = new statement(this.userConnetion);
        var sql = "CALL spGrabarServiciosHorarios('" + JSON.stringify(datosServiciosHorarios) + "')";
        statementConsumo.query(sql,(ok, data, error) => {
            var dataReturn = '';
            try {
                if (data[0]){
                    if ((data[0])[0]){
                        dataReturn = (data[0])[0];
                    }else{
                        dataReturn = data[0];
                    }
                }
            } catch (error) {
            }
            callback(ok, dataReturn, error);
            return;
        });
    };
};

module.exports = maestros;