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
            var ejecutados = 0;
            var terminados = 0;
            let consulta = new consultaMaestros('TareaProgramada');
            var resolver = () => {
                console.log('Ejecutados: ', ejecutados, ' Terminados: ', terminados);
                if (ejecutados === terminados){resolve('');}
                return;
            };
            consulta.consultarTareasxHora(this.horaEjecucion).then(async (data) => {
                await data.forEach(tarea => {
                    ejecutados += 1;
                    switch (tarea.nombreServicio) {
                        case 'Carga Trabajadores':
                            let consumir = new consumo();
                            consumir.cargarTrabajadores().then(data => {}).catch(error => {
                                console.log('Error Trabajadores: ', error);
                            }).finally(() => {
                                terminados += 1;
                                resolver();
                            });
                            break;
                        case 'Proceso Transaccional':
                            let consumira = new consumo();
                            consumira.cargarTransaccional().then(data => {}).catch(error => {
                                console.log('Error Transaccional: ', error);
                            }).finally(() => {
                                terminados += 1;
                                resolver();
                            });
                            break;
                        default:
                            terminados += 1;
                            console.log('Tarea ' + tarea.nombreServicio + ' no reconocida');
                            resolver();
                            break;
                    }
                });
            }).catch(error => {
                reject(error);
                return;
            });
        });
    };
};

module.exports = tareasprogramadas;