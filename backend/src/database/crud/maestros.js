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
};

module.exports = maestros;