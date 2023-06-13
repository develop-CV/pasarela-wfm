const { Router } = require('express');
const router = Router();

const returnServer = require('./returnServer.js');
const tokenServer = require('../utilidades/token.js');
const operacion = require('../database/crud/operacion.js');
const sara = require('../database/crud/sara.js');

/*
Servicio que carga la Plantilla Actualizada
Parametro de Entrada:
    {
        token: Token valido de la sesion
    }
*/
router.post('/consultaplanta', (req, res) => {
    var retorno = new returnServer().datoReturn;
    var entrada = req.body;
    var token = '';
    try {
        if (entrada.token) {
            token = entrada.token;
        }
    } catch (error) {
        token = '';
    }

    if (token.length > 0) {
        var validoToken = new tokenServer();
        validoToken.tokenValido(token, (esValido, data) => {
            if (esValido === true) {
                // CARGAR dataCargaPlanta
                var consulta = new sara();
                consulta.consultaPlanta().then((datosPlanta) => {
                    retorno.status.ok = true;
                    retorno.data = datosPlanta;
                    res.json(retorno);
                    return;
                })
                .catch((err) => {
                    retorno.status.ok = false;
                    retorno.status.mensaje = err;
                    retorno.data = [];
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
Servicio que carga la Plantilla Actualizada
Parametro de Entrada:
    {
        token: Token valido de la sesion,
        data: Array con los datos a cargar
    }
*/
router.post('/cargaplanta', (req, res) => {
    var retorno = new returnServer().datoReturn;
    var entrada = req.body;
    var token = '';
    var dataCargaPlanta;
    try {
        if (entrada.token) {
            token = entrada.token;
        }
        if (entrada.data) {
            dataCargaPlanta = entrada.data;
        }
    } catch (error) {
        token = '';
        dataCargaPlanta = null;
    }

    if (token.length > 0) {
        var validoToken = new tokenServer();
        validoToken.tokenValido(token, (esValido, data) => {
            if (esValido === true) {
                // CARGAR dataCargaPlanta
                var consulta = new operacion(data.usuario);
                consulta.grabarCargasPlanta(dataCargaPlanta, (ok, datoReturn, error) => {
                    if (ok){
                        retorno.status.ok = true;
                        retorno.data = datoReturn;
                        res.json(retorno);
                        return;
                    }else{
                        if (error){
                            retorno.status.ok = false;
                            retorno.status.mensaje = error.toString();
                            retorno.data = [];
                            res.json(retorno);
                            return;
                        }else{
                            retorno.status.ok = false;
                            retorno.status.mensaje = 'Error en la base de datos no reconocido para la carga de planta.';
                            retorno.data = [];
                            res.json(retorno);
                            return;
                        }
                    }
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

module.exports = router;