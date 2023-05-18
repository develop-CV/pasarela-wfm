const statement = require('../statementMariaDB.js');

class usuarios{
    userConnetion;
    constructor(usuarioConexion){
        this.userConnetion = usuarioConexion;
    }

    validarUsuario(usuario, callback){
        let statementConsumo = new statement(this.userConnetion);
        var parametros = {
            usuario: usuario
        };
        var sql = "CALL spConsultaUsuario('" + JSON.stringify(parametros) + "')";
        statementConsumo.query(sql,(ok, data, error) => {
            callback(ok, data[0], error);
        });
    };

    updatePasswordSinLogin(usuario, contrasena, callback){
        if (usuario.length > 0 && contrasena.length > 0){}else{
            callback(false, 'Usuario y Contraseña son datos Obligatorios.');
            return;
        };
        let statementConsumo = new statement(this.userConnetion);
        var parametros = {
            usuario: usuario,
            contrasena: contrasena
        };
        var sql = "CALL spGrabarLogin('" + JSON.stringify(parametros) + "')";
        statementConsumo.query(sql,(ok, data, error) => {
            callback(ok, error);
            return;
        });
    };

    consultarPassword(idUsuario, callback){
        if (idUsuario > 0){}else{
            callback(null, 'Usuario obligatorio.');
            return;
        };

        let statementConsumo = new statement(this.userConnetion);
        var sql = "SELECT pwd FROM usuarios WHERE id = " + idUsuario.toString();
        statementConsumo.query(sql,(ok, data, error) => {
            if (ok){
                try {
                    var pwd = data[0].pwd;
                    callback(pwd, '');
                    return;
                } catch (err) {
                    callback(null, err);
                    return;
                }
            }else{
                callback(null, error)
                return;
            }
        });

    };

    consultaUsuarios(idUsuario, callback){
        try {
            var sql = "CALL spConsultarUsuarios";
            if (idUsuario > 0){
                sql = sql + "(" + idUsuario.toString() + ")";
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

module.exports = usuarios;