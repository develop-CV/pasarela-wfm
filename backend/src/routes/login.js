const { Router } = require('express');
const router = Router();

const returnServer = require('./returnServer.js');
const tokenServer = require('./../utilidades/token.js');

/*
Servicio para validar el usuario en el Login
Parametro de Entrada:
    {
        usuario: Usuario Login
    }
*/
router.post('/user', (req, res) => {
    var retorno = new returnServer().datoReturn;
    var entrada = req.body;

    try {
        var usuario = entrada.usuario;
        if (!usuario.length > 0) {
            retorno.status.mensaje = 'El usuario es Obligatorio!!!';
            res.json(retorno);
            return;
        };
    } catch (error) {
        retorno.status.mensaje = 'El usuario es Obligatorio!!!';
        res.json(retorno);
        return;
    }

    try {
        const usuarios = require('../database/crud/usuarios.js');
        usuariosObj = new usuarios(usuario);
        usuariosObj.validarUsuario(usuario).then(data => {
            retorno.status.ok = true;

            var retornoData = {
                usuarioOK: false,
                data: data
            };
            try {
                if (data[0].datosUsuario.id > 0) {
                    retornoData.usuarioOK = true;
                    retornoData.data = data[0].datosUsuario;
                }
            } catch (error) {
            }

            retorno.data = JSON.stringify(retornoData);
            res.json(retorno);
            return;
        }).catch(error => {
            retorno.status.ok = false;
            retorno.status.mensaje = error;
            res.json(retorno);
            return;
        });
    } catch (error) {
        retorno.status.mensaje = error.toString();
        res.json(retorno);
        return;
    };
});

/*
Servicio para validar el usuario y la clave en el Login
Parametro de Entrada:
    {
        usuario: Usuario Login,
        contrasena: Nueva Contraseña
    }
*/
router.post('/login', (req, res) => {
    var retorno = new returnServer().datoReturn;
    var entrada = req.body;

    try {
        var usuario = entrada.usuario;
        var contrasena = entrada.contrasena;
        if (usuario.length > 0 && contrasena.length > 0) { } else {
            retorno.status.mensaje = 'El usuario y la contraseña son Obligatorios!!!';
            res.json(retorno);
            return;
        };
    } catch (error) {
        retorno.status.mensaje = 'El usuario y la contraseña son Obligatorios!!!';
        res.json(retorno);
        return;
    }

    try {
        const usuarios = require('../database/crud/usuarios.js');
        usuariosObj = new usuarios(usuario);
        usuariosObj.validarUsuario(usuario).then(data => {
            var retornoData = {
                usuarioOK: false,
                mensaje: '',
                data: null
            };

            try {
                if (data[0].datosUsuario.id > 0) { } else {
                    retorno.status.ok = true;
                    retornoData.usuarioOK = false;
                    retornoData.mensaje = 'Usuario no existe.';
                    retorno.data = JSON.stringify(retornoData);
                    res.json(retorno);
                    return;
                };
                if (data[0].datosUsuario.esActivo == 1) { } else {
                    retorno.status.ok = true;
                    retornoData.usuarioOK = false;
                    retornoData.mensaje = 'El usuario no se encuentra activo.';
                    retorno.data = JSON.stringify(retornoData);
                    res.json(retorno);
                    return;
                };
                if (data[0].datosUsuario.esEliminado == 0) { } else {
                    retorno.status.ok = true;
                    retornoData.usuarioOK = false;
                    retornoData.mensaje = 'El usuario se encuentra eliminado.';
                    retorno.data = JSON.stringify(retornoData);
                    res.json(retorno);
                    return;
                };

                usuariosObj.consultarPassword(data[0].datosUsuario.id).then(pwdDB => {
                    if (pwdDB.length > 0) {
                        const encriptacion = require('../utilidades/encriptacion.js');
                        var encryp = new encriptacion();
                        encryp.comparar(contrasena, pwdDB, (igual) => {
                            if (igual === true) {
                                retorno.status.ok = true;
                                retornoData.usuarioOK = true;
                                retornoData.data = data[0].datosUsuario;
                                retornoData.data = data;
                                var datosUsuarios = retornoData.data[0].datosUsuario;

                                // GENERAMOS EL TOKEN
                                var token = new tokenServer();
                                token.generarToken(datosUsuarios, (tokenString) => {
                                    if (tokenString.length > 0) {
                                        datosUsuarios.token = tokenString;
                                    } else {
                                        retorno.status.ok = true;
                                        retornoData.usuarioOK = false;
                                        retornoData.mensaje = 'No se pudo generar el TOKEN.';
                                        retorno.data = JSON.stringify(retornoData);
                                        res.json(retorno);
                                        return;
                                    };
                                });
                                retornoData.data[0].datosUsuario = datosUsuarios;

                                retorno.data = JSON.stringify(retornoData);
                                res.json(retorno);
                                return;
                            } else {
                                retorno.status.ok = true;
                                retornoData.usuarioOK = false;
                                retornoData.mensaje = 'Usuario y contraseña no valido.';
                                retorno.data = JSON.stringify(retornoData);
                                res.json(retorno);
                                return;
                            };
                        });
                    };
                }).catch(error => {
                    retorno.status.ok = false;
                    retorno.status.mensaje = error;
                    res.json(retorno);
                    return;
                });
            } catch (error) {
                retorno.status.ok = true;
                retornoData.usuarioOK = false;
                retornoData.mensaje = 'Usuario no valido.';
                retorno.data = JSON.stringify(retornoData);
                res.json(retorno);
                return;
            }
        }).catch(error => {
            retorno.status.mensaje = JSON.stringify(error);
            res.json(retorno);
            return;
        });
    } catch (error) {
        retorno.status.mensaje = error.toString();
        res.json(retorno);
        return;
    };
});

router.post('/validaciontoken', (req, res) => {
    var token = new tokenServer();
    try {
        var request = req.body;
        var tokenString = request.token;
        if (tokenString.length > 0) { } else {
            res.send(false);
        };
        token.tokenValido(tokenString, (esValido, data) => {
            res.send(esValido);
        });
    } catch (error) {
        res.send(false);
    }
});

/*
Servicio para ingresar la clave solamente por primera vez o por restauracion desde el maestro
Parametro de Entrada:
    {
        usuario: Usuario Login,
        contrasena: Nueva Contraseña
    }
*/
router.post('/newpwd', (req, res) => {
    var retorno = new returnServer().datoReturn;
    var entrada = req.body;
    retorno.data = {
        usuarioOK: false,
        mensaje: '',
        data: null
    };

    try {
        var usuario = entrada.usuario;
        var contrasena = entrada.contrasena;
    } catch (error) {
        retorno.status.mensaje = 'El usuario y la Clave son Obligatorios!!!';
        res.json(retorno);
        return;
    }

    if (usuario.length > 0 && contrasena.length > 0) { } else {
        retorno.status.mensaje = 'Usuario y Contraseña son datos Obligatorios!!!';
        res.json(retorno);
        return;
    };

    const usuarios = require('../database/crud/usuarios.js');
    usuariosObj = new usuarios(usuario);
    usuariosObj.validarUsuario(usuario).then(data => {
        try {
            if (data[0].datosUsuario.id > 0 && data[0].datosUsuario.esNuevoPassword == 1) {
                const encriptacion = require('../utilidades/encriptacion.js');
                var encryp = new encriptacion();
                encryp.encriptar(contrasena, (encriptado, error) => {
                    if (error) {
                        retorno.status.mensaje = 'Error al encriptar. ' + error.toString();
                        res.json(retorno);
                        return;
                    } else {
                        if (encriptado.length > 0) {
                            // ENVIAR
                            usuariosObj.updatePasswordSinLogin(usuario, encriptado).then(ok => {
                                if (ok) {
                                    // GENERAMOS EL TOKEN
                                    var datosUsuarios = data[0].datosUsuario;
                                    var token = new tokenServer();
                                    token.generarToken(datosUsuarios, (tokenString) => {
                                        if (tokenString.length > 0) {
                                            retorno.status.ok = true;
                                            datosUsuarios.token = tokenString;
                                            retorno.data.usuarioOK = true;
                                            retorno.data.mensaje = '';
                                            retorno.data.data = datosUsuarios;
                                            retorno.data.data.esNuevoPassword = 0;
                                            res.json(retorno);
                                            return;
                                        } else {
                                            retorno.status.ok = true;
                                            retorno.data.usuarioOK = false;
                                            retorno.data.mensaje = 'No se pudo generar el TOKEN.';
                                            res.json(retorno);
                                            return;
                                        };
                                    });
                                } else {
                                    retorno.status.ok = ok;
                                    retorno.status.mensaje = mensaje;
                                    res.json(retorno);
                                    return;
                                }
                            }).catch(error => {
                                retorno.status.ok = false;
                                retorno.status.mensaje = error;
                                res.json(retorno);
                                return;
                            });
                        } else {
                            retorno.status.mensaje = 'Error al encriptar. No llego dato encriptado.';
                            res.json(retorno);
                            return;
                        };
                    };
                });
            } else {
                retorno.status.mensaje = 'Para el usuario no se encuentra activo el cambio de contraseña.';
                res.json(retorno);
                return;
            };
        } catch (error) {
            retorno.status.mensaje = 'Usuario no valido para cambio de Contraseña.';
            res.json(retorno);
            return;
        };
    }).catch(error => {
        retorno.status.mensaje = 'Error al validar cambio de contraseña. ' + error.toString();
        res.json(retorno);
        return;
    });
});

module.exports = router;