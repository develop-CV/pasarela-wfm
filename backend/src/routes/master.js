const { Router } = require('express');
const router = Router();

const returnServer = require('./returnServer.js');
const tokenServer = require('./../utilidades/token.js');
const usuarios = require('./../database/crud/usuarios.js');
const maestros = require('./../database/crud/maestros.js');

/*
Servicio que retorna el maestro de usuarios
Parametro de Entrada:
    {
        token: Token valido de la sesion
    }
*/
router.post('/usuarios', (req, res) => {
    var retorno = new returnServer().datoReturn;
    var entrada = req.body;
    var token = '';
    var idUsuario = 0;
    try {
        if (entrada.token) {
            token = entrada.token;
        }
        if (entrada.idUsuario) {
            idUsuario = entrada.idUsuario;
        }
    } catch (error) {
        token = '';
        idUsuario = 0;
    }

    if (token.length > 0) {
        var validoToken = new tokenServer();
        validoToken.tokenValido(token, (esValido, data) => {
            if (esValido === true) {
                if (data.perfil === 'A') {
                    var consultaUsuarios = new usuarios(data.usuario);
                    consultaUsuarios.consultaUsuarios(idUsuario, (ok, data, error) => {
                        if (ok) {
                            retorno.status.ok = true;
                            retorno.data = JSON.stringify(data);
                        } else {
                            retorno.status.ok = false;
                            retorno.data = [];
                            if (error.length > 0) {
                                retorno.status.mensaje = error;
                            } else {
                                retorno.status.mensaje = "Error desconocido al consultar usuarios.";
                            };
                        };
                        res.json(retorno);
                        return;
                    });
                } else {
                    retorno.status.ok = false;
                    retorno.status.mensaje = 'Usuario sin permisos para esta consulta!!!';
                    retorno.data = [];
                    res.json(retorno);
                    return;
                };
            } else {
                retorno.status.ok = false;
                retorno.status.mensaje = 'Token no valido!!!';
                retorno.data = [];
                res.json(retorno);
                return;
            };
        });
    } else {
        retorno.status.ok = false;
        retorno.status.mensaje = 'Token no valido!!!';
        retorno.data = [];
        res.json(retorno);
        return;
    };
});

/*
Servicio que retorna el maestro de Tipos de Identificación
Parametro de Entrada:
    {
        token: Token valido de la sesion
    }
*/
router.post('/tiposidentificacion', (req, res) => {
    var retorno = new returnServer().datoReturn;
    var entrada = req.body;
    var token = '';
    var idTipoIdentificacion = 0;
    try {
        if (entrada.token) {
            token = entrada.token;
        }
        if (entrada.idTipoIdentificacion) {
            idTipoIdentificacion = entrada.idTipoIdentificacion;
        }
    } catch (error) {
        token = '';
        idTipoIdentificacion = 0;
    }

    if (token.length > 0) {
        var validoToken = new tokenServer();
        validoToken.tokenValido(token, (esValido, data) => {
            if (esValido === true) {
                var consulta = new maestros(data.usuario);
                consulta.consultaTiposIdentificacion(idTipoIdentificacion, (ok, data, error) => {
                    if (ok) {
                        retorno.status.ok = true;
                        retorno.data = JSON.stringify(data);
                    } else {
                        retorno.status.ok = false;
                        retorno.data = [];
                        if (error.length > 0) {
                            retorno.status.mensaje = error;
                        } else {
                            retorno.status.mensaje = "Error desconocido al consultar los tipos de identificación.";
                        };
                    };
                    res.json(retorno);
                    return;
                });
            } else {
                retorno.status.ok = false;
                retorno.status.mensaje = 'Token no valido!!!';
                retorno.data = [];
                res.json(retorno);
                return;
            };
        });
    } else {
        retorno.status.ok = false;
        retorno.status.mensaje = 'Token no valido!!!';
        retorno.data = [];
        res.json(retorno);
        return;
    };
});

/*
Servicio para grabar usuario tanto UPDATE como INSERT
Parametro de Entrada:
    {
        token: Token valido de la sesion,
        datosUsuario: {
            id: (BIGINT) identity del usuario en caso de UPDATE,
            idTipoIdentificacion: (BIGINT) identity del tipo de identificacion,
            identificacion: (VARCHAR) Identificacion del usuario,
            nombreCompleto: (VARCHAR) Nombre completo del usuario,
            correo: (VARCHAR) email del usuario,
            perfil: (VARCHAR) Perfil del usuario A-Administrador G-Gestor,
            esActivo: (BOOLEAN) si el usuario esta activo,
            esNuevoPassword: (BOOLEAN) Si el usuario debe restaurar contraseña,
            esEliminado: (BOOLEAN) si es un usuario eliminado
        }
    }
*/
router.post('/grabarusuario', (req, res) => {
    var retorno = new returnServer().datoReturn;
    var entrada = req.body;
    var token = '';
    var datosUsuario = '';
    try {
        if (entrada.token) {
            token = entrada.token;
        }
        if (entrada.datosUsuario) {
            datosUsuario = entrada.datosUsuario;
        }
    } catch (error) {
        token = '';
        datosUsuario = '';
    }

    if (token.length > 0) {
        var validoToken = new tokenServer();
        validoToken.tokenValido(token, (esValido, data) => {
            if (esValido === true) {
                if (data.perfil === 'A') {
                    var consulta = new usuarios(data.usuario);
                    consulta.updateUsuario(datosUsuario, (ok, data, error) => {
                        if (ok) {
                            try {
                                if (data.ok == true) {
                                    retorno.status.ok = true;
                                    retorno.data = JSON.stringify(data);
                                } else {
                                    retorno.status.ok = false;
                                    retorno.status.mensaje = data.mensaje;
                                }
                            } catch (error) {
                                retorno.status.ok = false;
                                retorno.status.mensaje = error;
                            }
                        } else {
                            retorno.status.ok = false;
                            retorno.data = [];
                            if (error.length > 0) {
                                retorno.status.mensaje = error;
                            } else {
                                retorno.status.mensaje = "Error desconocido al grabar el usuario.";
                            };
                        };
                        res.json(retorno);
                        return;
                    });
                } else {
                    retorno.status.ok = false;
                    retorno.status.mensaje = 'No cuenta con permisos para modificar datos de usuarios.';
                    retorno.data = [];
                    res.json(retorno);
                    return;
                };
            } else {
                retorno.status.ok = false;
                retorno.status.mensaje = 'Token no valido!!!';
                retorno.data = [];
                res.json(retorno);
                return;
            };
        });
    } else {
        retorno.status.ok = false;
        retorno.status.mensaje = 'Token no valido!!!';
        retorno.data = [];
        res.json(retorno);
        return;
    };
});


/*
Servicio que retorna los horarios en que se deben ejecutar los servicios
Parametro de Entrada:
    {
        token: Token valido de la sesion
    }
*/
router.post('/frecuenciacarga', (req, res) => {
    var retorno = new returnServer().datoReturn;
    var entrada = req.body;
    var token = '';
    var idServicioHorario = 0;
    try {
        if (entrada.token) {
            token = entrada.token;
        }
        if (entrada.idServicioHorario) {
            idServicioHorario = entrada.idServicioHorario;
        }
    } catch (error) {
        token = '';
        idServicioHorario = 0;
    }

    if (token.length > 0) {
        var validoToken = new tokenServer();
        validoToken.tokenValido(token, (esValido, data) => {
            if (esValido === true) {
                var consulta = new maestros(data.usuario);
                consulta.consultarServiciosHorarios(idServicioHorario, (ok, data, error) => {
                    if (ok) {
                        retorno.status.ok = true;
                        retorno.data = JSON.stringify(data);
                    } else {
                        retorno.status.ok = false;
                        retorno.data = [];
                        console.log(error);
                        if (error.length > 0) {
                            retorno.status.mensaje = error;
                        } else {
                            retorno.status.mensaje = "Error desconocido al consultar las frecuencias de carga para los servicios.";
                        };
                    };
                    res.json(retorno);
                    return;
                });
            } else {
                retorno.status.ok = false;
                retorno.status.mensaje = 'Token no valido!!!';
                retorno.data = [];
                res.json(retorno);
                return;
            };
        });
    } else {
        retorno.status.ok = false;
        retorno.status.mensaje = 'Token no valido!!!';
        retorno.data = [];
        res.json(retorno);
        return;
    };
});


/*
Servicio que retorna el maestro de Servicios
Parametro de Entrada:
    {
        idServicio: id Servicio a consultar o cero(0) para todos,
        token: Token valido de la sesion
    }
*/
router.post('/servicios', (req, res) => {
    var retorno = new returnServer().datoReturn;
    var entrada = req.body;
    var token = '';
    var idServicio = 0;
    try {
        if (entrada.token) {
            token = entrada.token;
        }
        if (entrada.idServicio) {
            idServicio = entrada.idServicio;
        }
    } catch (error) {
        token = '';
        idServicio = 0;
    }

    if (token.length > 0) {
        var validoToken = new tokenServer();
        validoToken.tokenValido(token, (esValido, data) => {
            if (esValido === true) {
                var consulta = new maestros(data.usuario);
                consulta.consultaServicios(idServicio, (ok, data, error) => {
                    if (ok) {
                        retorno.status.ok = true;
                        retorno.data = JSON.stringify(data);
                    } else {
                        retorno.status.ok = false;
                        retorno.data = [];
                        if (error.length > 0) {
                            retorno.status.mensaje = error;
                        } else {
                            retorno.status.mensaje = "Error desconocido al consultar los servicios.";
                        };
                    };
                    console.log('return 1');
                    res.json(retorno);
                    return;
                });
            } else {
                retorno.status.ok = false;
                retorno.status.mensaje = 'Token no valido!!!';
                retorno.data = [];
                console.log('return 2');
                res.json(retorno);
                return;
            };
        });
    } else {
        retorno.status.ok = false;
        retorno.status.mensaje = 'Token no valido!!!';
        retorno.data = [];
        console.log('return 3');
        res.json(retorno);
        return;
    };
});

/*
Servicio para grabar servicio horario tanto UPDATE como INSERT
Parametro de Entrada:
    {
        token: Token valido de la sesion,
        datosServicioHorario: {
            id: (BIGINT) identity del horario en caso de UPDATE,
            idServicio: (BIGINT) identity del servicio,
            hora: (TIME) Hora en que se debe ejecutar todos los días,
            esActivo: (BOOLEAN) si el horario esta activo
        }
    }
*/
router.post('/grabarfrecuenciacarga', (req, res) => {
    var retorno = new returnServer().datoReturn;
    var entrada = req.body;
    var token = '';
    var datosServicioHorario = '';
    try {
        if (entrada.token) {
            token = entrada.token;
        }
        if (entrada.datosServicioHorario) {
            datosServicioHorario = entrada.datosServicioHorario;
        }
    } catch (error) {
        token = '';
        datosServicioHorario = '';
    }

    if (token.length > 0) {
        var validoToken = new tokenServer();
        validoToken.tokenValido(token, (esValido, data) => {
            if (esValido === true) {
                if (data.perfil === 'A') {
                    var consulta = new maestros(data.usuario);
                    consulta.updateServiciosHorarios(datosServicioHorario, (ok, data, error) => {
                        if (ok) {
                            try {
                                if (data.ok == true) {
                                    retorno.status.ok = true;
                                    retorno.data = JSON.stringify(data);
                                } else {
                                    retorno.status.ok = false;
                                    retorno.status.mensaje = data.mensaje;
                                }
                            } catch (error) {
                                retorno.status.ok = false;
                                retorno.status.mensaje = error;
                            }
                        } else {
                            retorno.status.ok = false;
                            retorno.data = [];
                            if (error) {
                                retorno.status.mensaje = error;
                            } else {
                                retorno.status.mensaje = "Error desconocido al grabar la frecuencia de carga.";
                            };
                        };
                        res.json(retorno);
                        return;
                    });
                } else {
                    retorno.status.ok = false;
                    retorno.status.mensaje = 'No cuenta con permisos para modificar datos de la frecuencia de carga.';
                    retorno.data = [];
                    res.json(retorno);
                    return;
                };
            } else {
                retorno.status.ok = false;
                retorno.status.mensaje = 'Token no valido!!!';
                retorno.data = [];
                res.json(retorno);
                return;
            };
        });
    } else {
        retorno.status.ok = false;
        retorno.status.mensaje = 'Token no valido!!!';
        retorno.data = [];
        res.json(retorno);
        return;
    };
});

module.exports = router;