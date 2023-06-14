const statement = require('../statementMariaDB.js');

class usuarios {
    userConnetion;
    constructor(usuarioConexion) {
        this.userConnetion = usuarioConexion;
    }

    validarUsuario(usuario) {
        return new Promise((resolve, reject) => {
            let statementConsumo = new statement(this.userConnetion);
            var parametros = {
                usuario: usuario
            };
            var sql = "CALL spConsultaUsuario('" + JSON.stringify(parametros) + "')";
            statementConsumo.query(sql, (ok, data, error) => {
                if (ok) {
                    resolve(data[0]);
                } else {
                    reject(error);
                };
            });
        });
    };

    updatePasswordSinLogin(usuario, contrasena) {
        return new Promise((resolve, reject) => {
            if (usuario.length > 0 && contrasena.length > 0) { } else {
                reject('Usuario y Contraseña son datos Obligatorios.');
                return;
            };
            let statementConsumo = new statement(this.userConnetion);
            var parametros = {
                usuario: usuario,
                contrasena: contrasena
            };
            var sql = "CALL spGrabarLogin('" + JSON.stringify(parametros) + "')";
            statementConsumo.query(sql, (ok, data, error) => {
                if (ok) {
                    resolve(data);
                } else {
                    reject(error);
                };
            });
        });
    };

    consultarPassword(idUsuario) {
        return new Promise((resolve, reject) => {
            if (idUsuario > 0) { } else {
                reject('Usuario obligatorio.');
                return;
            };

            let statementConsumo = new statement(this.userConnetion);
            var sql = "SELECT pwd FROM usuarios WHERE id = " + idUsuario.toString();
            statementConsumo.query(sql, (ok, data, error) => {
                if (ok) {
                    try {
                        var pwd = data[0].pwd;
                        resolve(pwd);
                        return;
                    } catch (err) {
                        reject(err);
                        return;
                    }
                } else {
                    reject(error)
                    return;
                }
            });
        });
    };

    consultaUsuarios(idUsuario) {
        return new Promise((resolve, reject) => {
            try {
                var sql = "CALL spConsultarUsuarios";
                if (idUsuario > 0) {
                    sql = sql + "(" + idUsuario.toString() + ")";
                } else {
                    sql = sql + "(0)";
                };
                let statementConsumo = new statement(this.userConnetion);
                statementConsumo.query(sql, (ok, data, error) => {
                    if (ok) {
                        resolve(data[0])
                    } else {
                        reject(error);
                    }
                    return;
                });
            } catch (error) {
                reject(error);
                return;
            };
        });
    };

    updateUsuario(datosUsuario) {
        return new Promise((resolve, reject) => {
            let statementConsumo = new statement(this.userConnetion);
            var sql = "CALL spGrabarUsuario('" + JSON.stringify(datosUsuario) + "')";
            statementConsumo.query(sql, (ok, data, error) => {
                if (ok){
                    var dataReturn = '';
                    try {
                        if (data[0]) {
                            if ((data[0])[0]) {
                                dataReturn = (data[0])[0];
                            } else {
                                dataReturn = data[0];
                            }
                        }
                        resolve(dataReturn);
                    } catch (error) {
                        reject(error);
                    }
                }else{
                    reject(error);
                };
                return;
            });
        });
    };
};

module.exports = usuarios;