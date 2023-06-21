const consultaMaestros = require('../database/crud/maestros.js');
const consumo = require('../servers/consumoServicios.js');

class tareasprogramadas {
    horaEjecucion;
    constructor() {
        var fechaEjecucion = new Date();
        this.horaEjecucion = (fechaEjecucion.getHours() < 10 ? '0' : '') + fechaEjecucion.getHours() + ':' + (fechaEjecucion.getMinutes() < 10 ? '0' : '') + fechaEjecucion.getMinutes();
        console.log('Tarea Ejecutada a las', this.horaEjecucion, 'horas.');
    };

    ejecutarTareas() {
        return new Promise((resolve, reject) => {
            let consulta = new consultaMaestros('TareaProgramada');
            consulta.consultarTareasxHora(this.horaEjecucion).then(async (data) => {
                await data.forEach(tarea => {
                    switch (tarea.nombreServicio) {
                        case 'Carga Trabajadores':
                            let consumir = new consumo();
                            consumir.cargarTrabajadores().then(data => {}).catch(error => {}).finally(() => {});
                            break;
                        case 'Proceso Transaccional':
                            let consumira = new consumo();
                            consumira.cargarTransaccional().then(data => {}).catch(error => {}).finally(() => {});
                            break;
                        default:
                            reject('Tarea ' + tarea.nombreServicio + ' no reconocida');
                            break;
                    }
                });
                resolve(data.length);
            }).catch(error => {
                reject(error);
                return;
            });
        });
    };
};

module.exports = tareasprogramadas;