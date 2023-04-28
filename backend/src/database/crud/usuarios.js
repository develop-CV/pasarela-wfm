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
            callback(ok, data, error);
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
                    var pwd = data.pwd;
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
};

module.exports = usuarios;