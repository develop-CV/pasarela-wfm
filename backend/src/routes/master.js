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
        if (entrada.idUsuario){
            idUsuario = entrada.idUsuario;
        }
    } catch (error) {
        token = '';
        idUsuario = 0;
    }

    if (token.length > 0) { } else {
        retorno.status.ok = false;
        retorno.status.mensaje = 'Token no valido!!!';
        retorno.data = [];
        res.json(retorno);
        return;
    }

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
        if (entrada.idTipoIdentificacion){
            idTipoIdentificacion = entrada.idTipoIdentificacion;
        }
    } catch (error) {
        token = '';
        idTipoIdentificacion = 0;
    }

    if (token.length > 0) { } else {
        retorno.status.ok = false;
        retorno.status.mensaje = 'Token no valido!!!';
        retorno.data = [];
        res.json(retorno);
        return;
    }

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
    
    if (token.length > 0) { } else {
        retorno.status.ok = false;
        retorno.status.mensaje = 'Token no valido!!!';
        retorno.data = [];
        res.json(retorno);
        return;
    }
    
    var validoToken = new tokenServer();
    validoToken.tokenValido(token, (esValido, data) => {
        if (esValido === true) {
            if (data.perfil === 'A'){
                var consulta = new usuarios(data.usuario);
                consulta.updateUsuario(datosUsuario, (ok, data, error) => {
                    if (ok) {
                        try {
                            if (data.ok == true){
                                retorno.status.ok = true;
                                retorno.data = JSON.stringify(data);
                            }else{
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
            }else{
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
});

module.exports = router;