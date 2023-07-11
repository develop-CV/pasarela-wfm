const consumoWFM = require('./wfm/consumoWFM.js');
const operacion = require('../database/crud/operacion.js');
const sara = require('../database/crud/sara.js');
const maestros = require('../database/crud/maestros.js')

class consumoServicios {
    constructor() { };
    cargarTrabajadores() {
        return new Promise((resolve, reject) => {
            let maestro = new maestros('TareaProgramada');
            maestro.updateCargas({
                tipo: 'WFMCargaTrabajadores',
                entrada: '',
                salida: '',
                estado: 'O'
            }).then(idCarga => {
                let consumo = new consumoWFM('Trabajadores');
                consumo.autenticar().then(token => {
                    let consulta = new operacion('CargaAutomaticaTrabajadores');
                    consulta.consultarCargasPlanta().then(datosReporte => {
                        if (datosReporte.length > 0) {
                            //console.log('datosReporte', datosReporte.length);
                            this.construirDataTrabajadores(datosReporte).then(datos => {
                                //console.log('datos ', datos.InfoTrabajadores.length);
                                consumo.procesar(token, datos, idCarga).then(respuesta => {
                                    maestro.updateCargas({
                                        id: idCarga,
                                        entrada: JSON.parse(JSON.stringify(datos).replaceAll("'", "")),
                                        salida: JSON.parse(respuesta.toString().replaceAll("'", "")),
                                        estado: 'T',
                                        fechaFinalizado: 'NOW'
                                    }).then(datoAuditoria => {
                                        console.log('Respuesta Trabajadores: ', respuesta);
                                        resolve(respuesta);
                                        return;
                                    }).catch(error => {
                                        maestro.updateCargas({
                                            id: idCarga,
                                            entrada: JSON.parse(JSON.stringify(datos).replaceAll("'", "")),
                                            salida: {error: error.toString().replaceAll("'", "")},
                                            estado: 'T',
                                            fechaFinalizado: 'NOW'
                                        }).finally(() => {
                                            reject('Se presento error al actualizar la auditoria para los Trabajadores: ' + error);
                                        });
                                    });
                                }).catch(error => {
                                    maestro.updateCargas({
                                        id: idCarga,
                                        entrada: JSON.parse(JSON.stringify(datos).replaceAll("'", "")),
                                        salida: {error: error.toString().replaceAll("'", "")},
                                        estado: 'T',
                                        fechaFinalizado: 'NOW'
                                    }).finally(() => {
                                        reject('Se presento error al consumir servicio de procesar para los Trabajadores: ' + error);
                                    });
                                });
                            }).catch(error => {
                                maestro.updateCargas({
                                    id: idCarga,
                                    salida: {error: error.toString().replaceAll("'", "")},
                                    estado: 'T',
                                    fechaFinalizado: 'NOW'
                                }).finally(() => {
                                    reject('Error al construir el array de datos: ' + error);
                                });
                            });
                        } else {
                            maestro.updateCargas({
                                id: idCarga,
                                salida: {error:"No existe información para reportar"},
                                estado: 'T',
                                fechaFinalizado: 'NOW'
                            }).finally(() => {
                                reject('No existe información para reportar.');
                            });
                        };
                    }).catch(error => {
                        maestro.updateCargas({
                            id: idCarga,
                            salida: {error: error.toString().replaceAll("'", "")},
                            estado: 'T',
                            fechaFinalizado: 'NOW'
                        }).finally(() => {
                            reject('Se presento error al consultar los datos en la base de datos: ' + error);
                        });
                    });
                }).catch(error => {
                    maestro.updateCargas({
                        id: idCarga,
                        salida: {error: error.toString().replaceAll("'", "")},
                        estado: 'T',
                        fechaFinalizado: 'NOW'
                    }).finally(() => {
                        reject('Se presento error al consumir servicio de autenticación: ' + error);
                    });
                });
            }).catch(error => {
                reject('Se presento error al grabar la auditoria de la carga para los Trabajadores: ' + error);
            });
        });
    };

    construirDataTrabajadores(dataReporte) {
        return new Promise((resolve, reject) => {
            try {
                var dataReturn = {
                    Descripcion: '',
                    InfoTrabajadores: []
                };
                if (dataReporte.length > 0) {
                    dataReporte.forEach(dato => {
                        var indexCodigo = dataReturn.InfoTrabajadores.findIndex((buscar) => buscar.CodigoTrabajador === dato.codigo);
                        if (indexCodigo > 0) { } else {
                            indexCodigo = dataReturn.InfoTrabajadores.push({
                                CodigoTrabajador: dato.codigo,
                                Nombre1: dato.nombres,
                                Nombre2: '',
                                Apellido1: dato.primerApellido,
                                Apellido2: dato.segundoApellido,
                                Email: dato.email,
                                InfoFechada: []
                            });
                            indexCodigo = indexCodigo - 1;
                        };
                        dataReturn.InfoTrabajadores[indexCodigo].InfoFechada.push({
                            FechaInicioVigencia: dato.fechaInicioVigencia,
                            CodigoEstablecimiento: dato.codigoEstablecimiento,
                            NombreEstablecimiento: dato.nombreEstablecimiento,
                            CodigoUnidadDeTrabajo: dato.codigoUnidadTrabajo,
                            NombreUnidadDeTrabajo: dato.nombreUnidadTrabajo,
                            NivelExperto: dato.nivelExperto,
                            TipoTrabajador: dato.tipoTrabajador,
                            ContratoDeTrabajo: dato.contrato,
                            Contratado: dato.contratado,
                            RealizaMarcaciones: dato.realizaMarcaciones,
                            BorrarInformacionFutura: dato.borrarInformacionFutura
                        });
                    });
                    resolve(dataReturn);
                } else {
                    reject('No existe información para reportar.');
                    return;
                };
            } catch (error) {
                reject(error);
                return;
            };
        });
    };

    cargarTransaccional() {
        return new Promise((resolve, reject) => {
            let maestro = new maestros('TareaProgramada');
            maestro.updateCargas({
                tipo: 'WFMCargaTransaccion',
                entrada: '',
                salida: '',
                estado: 'O'
            }).then(idCarga => {
                let consumo = new consumoWFM('Transaccional');
                consumo.autenticar().then(token => {
                    let consulta = new sara();
                    consulta.transaccionalParametrosConsulta().then(parametros => {
                        consulta.consultaTransaccional(parametros).then(datosReporte => {
                            if (datosReporte.length > 0) {
                                //console.log('datosReporte', datosReporte.length);
                                this.construirDataTransaccional(datosReporte, parametros).then(datos => {
                                    //console.log('datos ', datos.InfoTransaccional.length);
                                    consumo.procesar(token, datos).then(respuesta => {
                                        maestro.updateCargas({
                                            id: idCarga,
                                            entrada: JSON.parse(JSON.stringify(datos).replaceAll("'", "")),
                                            salida: JSON.parse(respuesta.toString().replaceAll("'", "")),
                                            estado: 'T',
                                            fechaFinalizado: 'NOW'
                                        }).then(datoAuditoria => {
                                            console.log('Respuesta Transaccional: ', respuesta);
                                            resolve(respuesta);
                                            return;
                                        }).catch(error => {
                                            maestro.updateCargas({
                                                id: idCarga,
                                                entrada: JSON.parse(JSON.stringify(datos).replaceAll("'", "")),
                                                salida: {error: error.toString().replaceAll("'", "")},
                                                estado: 'T',
                                                fechaFinalizado: 'NOW'
                                            }).finally(() => {
                                                reject('Se presento error al actualizar la auditoria para lo Transaccional: ' + error);
                                            });
                                        });
                                    }).catch(error => {
                                        maestro.updateCargas({
                                            id: idCarga,
                                            entrada: JSON.parse(JSON.stringify(datos).replaceAll("'", "")),
                                            salida: {error: error.toString().replaceAll("'", "")},
                                            estado: 'T',
                                            fechaFinalizado: 'NOW'
                                        }).finally(() => {
                                            reject('Se presento error al consumir servicio de procesar para lo Transaccional: ' + error);
                                        });
                                    });
                                }).catch(error => {
                                    maestro.updateCargas({
                                        id: idCarga,
                                        salida: {error: error.toString().replaceAll("'", "")},
                                        estado: 'T',
                                        fechaFinalizado: 'NOW'
                                    }).finally(() => {
                                        reject('Error al construir el array de datos: ' + error);
                                    });
                                });
                            } else {
                                maestro.updateCargas({
                                    id: idCarga,
                                    salida: {error:"No existe información para reportar"},
                                    estado: 'T',
                                    fechaFinalizado: 'NOW'
                                }).finally(() => {
                                    reject('No existe información para reportar.');
                                });
                            };
                        }).catch(error => {
                            maestro.updateCargas({
                                id: idCarga,
                                salida: {error: error.toString().replaceAll("'", "")},
                                estado: 'T',
                                fechaFinalizado: 'NOW'
                            }).finally(() => {
                                reject('Se presento error al consultar los datos en la base de datos: ' + error);
                            });
                        });
                    }).catch(error => {
                        maestro.updateCargas({
                            id: idCarga,
                            salida: {error: error.toString().replaceAll("'", "")},
                            estado: 'T',
                            fechaFinalizado: 'NOW'
                        }).finally(() => {
                            reject(error);
                        });
                    });
                }).catch(error => {
                    maestro.updateCargas({
                        id: idCarga,
                        salida: {error: error.toString().replaceAll("'", "")},
                        estado: 'T',
                        fechaFinalizado: 'NOW'
                    }).finally(() => {
                        reject('Se presento error al consumir servicio de autenticación: ' + error);
                    });
                });
            }).catch(error => {
                reject('Se presento error al grabar la auditoria de la carga para lo Transaccional: ' + error);
            });
        });
    };

    construirDataTransaccional(dataReporte, dataParametros) {
        return new Promise((resolve, reject) => {
            try {
                var dataReturn = {
                    Descripcion: 'Prueba Venta',
                    FechaInicio: dataParametros.fechaInicial.getFullYear() + "/" +
                        ("00" + (dataParametros.fechaInicial.getMonth() + 1)).slice(-2) + "/" +
                        ("00" + dataParametros.fechaInicial.getDate()).slice(-2),
                    FechaTermino: dataParametros.fechaFinal.getFullYear() + "/" +
                        ("00" + (dataParametros.fechaFinal.getMonth() + 1)).slice(-2) + "/" +
                        ("00" + dataParametros.fechaFinal.getDate()).slice(-2),
                    InfoTransaccional: []
                };

                dataReporte.forEach(dato => {
                    dataReturn.InfoTransaccional.push({
                        CodigoEstablecimiento: dato.CODIGO,
                        NombreEstablecimiento: dato.TIENDA,
                        UnidadComercial: dato.UNIDAD_COMERCIAL,
                        DriverComercial: dato.DRIVER_COMERCIAL,
                        Canal: dato.CANAL,
                        Fecha: dato.FECHA.getFullYear() + "/" +
                            ("00" + (dato.FECHA.getMonth() + 1)).slice(-2) + "/" +
                            ("00" + dato.FECHA.getDate()).slice(-2),
                        Valores: [
                            dato.H_00_00, dato.H_00_15, dato.H_00_30, dato.H_00_45,
                            dato.H_01_00, dato.H_01_15, dato.H_01_30, dato.H_01_45,
                            dato.H_02_00, dato.H_02_15, dato.H_02_30, dato.H_02_45,
                            dato.H_03_00, dato.H_03_15, dato.H_03_30, dato.H_03_45,
                            dato.H_04_00, dato.H_04_15, dato.H_04_30, dato.H_04_45,
                            dato.H_05_00, dato.H_05_15, dato.H_05_30, dato.H_05_45,
                            dato.H_06_00, dato.H_06_15, dato.H_06_30, dato.H_06_45,
                            dato.H_07_00, dato.H_07_15, dato.H_07_30, dato.H_07_45,
                            dato.H_08_00, dato.H_08_15, dato.H_08_30, dato.H_08_45,
                            dato.H_09_00, dato.H_09_15, dato.H_09_30, dato.H_09_45,
                            dato.H_10_00, dato.H_10_15, dato.H_10_30, dato.H_10_45,
                            dato.H_11_00, dato.H_11_15, dato.H_11_30, dato.H_11_45,
                            dato.H_12_00, dato.H_12_15, dato.H_12_30, dato.H_12_45,
                            dato.H_13_00, dato.H_13_15, dato.H_13_30, dato.H_13_45,
                            dato.H_14_00, dato.H_14_15, dato.H_14_30, dato.H_14_45,
                            dato.H_15_00, dato.H_15_15, dato.H_15_30, dato.H_15_45,
                            dato.H_16_00, dato.H_16_15, dato.H_16_30, dato.H_16_45,
                            dato.H_17_00, dato.H_17_15, dato.H_17_30, dato.H_17_45,
                            dato.H_18_00, dato.H_18_15, dato.H_18_30, dato.H_18_45,
                            dato.H_19_00, dato.H_19_15, dato.H_19_30, dato.H_19_45,
                            dato.H_20_00, dato.H_20_15, dato.H_20_30, dato.H_20_45,
                            dato.H_21_00, dato.H_21_15, dato.H_21_30, dato.H_21_45,
                            dato.H_22_00, dato.H_22_15, dato.H_22_30, dato.H_22_45,
                            dato.H_23_00, dato.H_23_15, dato.H_23_30, dato.H_23_45
                        ]
                    });
                });

                resolve(dataReturn);
            } catch (error) {
                reject(error);
            }
        });
    };
};

module.exports = consumoServicios;