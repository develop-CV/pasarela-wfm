const consumoWFM = require('./wfm/consumoWFM.js');
const operacion = require('../database/crud/operacion.js');

class consumoServicios {
    constructor() { };
    cargarTrabajadores() {
        return new Promise((resolve, reject) => {
            let consumo = new consumoWFM('Trabajadores');
            consumo.autenticar().then(token => {
                let consulta = new operacion('CargaAutomaticaTrabajadores');
                consulta.consultarCargasPlanta().then(datosReporte => {
                    if (datosReporte.length > 0) {
                        console.log('datosReporte', datosReporte.length);
                        this.construirDataTrabajadores(datosReporte).then(datos => {
                            console.log('datos ', datos.InfoTrabajadores.length);
                            /*
                            datos.InfoTrabajadores.forEach(data => {
                                console.log(data);
                            })
                            */
                            resolve(datos);
                        }).catch(error => {
                            reject('Error al construir el array de datos: ' + error);
                        })
                    } else {
                        reject('No existe información para reportar.');
                    };
                }).catch(error => {
                    reject('Se presento error al consultar los datos en la base de datos: ' + error);
                })
            }).catch(error => {
                reject('Se presento error al consumir servicio de autenticación: ' + error);
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
            }
        });
    };
};

module.exports = consumoServicios;