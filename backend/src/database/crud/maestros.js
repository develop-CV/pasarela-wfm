const statement = require('../statementMariaDB.js');

class maestros {
    userConnetion;
    constructor(usuarioConexion) {
        this.userConnetion = usuarioConexion;
    }

    consultaTiposIdentificacion(idTipoIdentificacion) {
        return new Promise((resolve, reject) => {
            try {
                var sql = "CALL spConsultarTiposIdentificacion";
                if (idTipoIdentificacion > 0) {
                    sql = sql + "(" + idTipoIdentificacion.toString() + ")";
                } else {
                    sql = sql + "(0)";
                };

                let statementConsumo = new statement(this.userConnetion);
                statementConsumo.query(sql, (ok, data, error) => {
                    if (ok) {
                        resolve(data[0]);
                        return;
                    } else {
                        reject(error);
                        return;
                    };
                });
            } catch (error) {
                reject(error);
                return;
            };
        });
    };

    consultarServiciosHorarios(idServicioHorario) {
        return new Promise((resolve, reject) => {
            try {
                var sql = "CALL spConsultarServiciosHorarios";
                if (idServicioHorario > 0) {
                    sql = sql + "(" + idServicioHorario.toString() + ")";
                } else {
                    sql = sql + "(0)";
                };

                let statementConsumo = new statement(this.userConnetion);
                statementConsumo.query(sql, (ok, data, error) => {
                    if (ok) {
                        resolve(data[0]);
                    } else {
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

    consultaServicios(idServicio) {
        return new Promise((resolve, reject) => {
            try {
                var sql = "CALL spConsultarServicios";
                if (idServicio > 0) {
                    sql = sql + "(" + idServicio.toString() + ")";
                } else {
                    sql = sql + "(0)";
                };

                let statementConsumo = new statement(this.userConnetion);
                statementConsumo.query(sql, (ok, data, error) => {
                    if (ok) {
                        resolve(data[0]);
                    } else {
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

    updateServiciosHorarios(datosServiciosHorarios) {
        return new Promise((resolve, reject) => {
            let statementConsumo = new statement(this.userConnetion);
            var sql = "CALL spGrabarServiciosHorarios('" + JSON.stringify(datosServiciosHorarios) + "')";
            statementConsumo.query(sql, (ok, data, error) => {
                if (ok) {
                    var dataReturn = '';
                    try {
                        if (data[0]) {
                            if ((data[0])[0]) {
                                dataReturn = (data[0])[0];
                            } else {
                                dataReturn = data[0];
                            };
                        };
                        resolve(dataReturn);
                    } catch (error) {
                        reject(error);
                    };
                } else {
                    reject(error);
                };
                return;
            });
        });
    };

    consultarTareasxHora(hora) {
        return new Promise((resolve, reject) => {
            let statementConsumo = new statement(this.userConnetion);
            var sql = "CALL spConsultarTareas('" + hora + "')";
            statementConsumo.query(sql, (ok, data, error) => {
                if (ok) {
                    resolve(data[0]);
                } else {
                    reject(error);
                };
                return;
            });
        });
    };

    updateAuditorias(datos) {
        return new Promise((resolve, reject) => {
            let statementConsumo = new statement(this.userConnetion);
            var sql = "CALL spAuditoria('" + datos.entidad + "', '" + datos.datoAnterior + "', '" + datos.datoNuevo + "')";
            statementConsumo.query(sql, (ok, data, error) => {
                console.log(error);
                if (ok) {
                    resolve(data[0]);
                } else {
                    reject(error);
                };
                return;
            });
        });
    }

    updateCargas(datos) {
        return new Promise((resolve, reject) => {
            let statementConsumo = new statement(this.userConnetion);
            var sql = "CALL spGrabarCargasAuditoria('[" + JSON.stringify(datos) + "]')";
            statementConsumo.query(sql, (ok, data, error) => {
                if (ok) {
                    data = data[0];
                    if (data[0].ok == true && data[0].idCarga > 0) {
                        resolve(data[0].idCarga);
                    } else {
                        reject(data[0].mensaje);
                    };
                } else {
                    reject(error);
                };
                return;
            });
        });
    };

    consultarParametros(codigo) {
        return new Promise((resolve, reject) => {
            let statementConsumo = new statement(this.userConnetion);
            var sql = "CALL spConsultarParametros('" + codigo + "')";
            statementConsumo.query(sql, (ok, data, error) => {
                if (ok) {
                    resolve(data[0]);
                } else {
                    reject(error);
                };
                return;
            });
        });
    };
};

module.exports = maestros;