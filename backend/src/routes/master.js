const { Router } = require('express');
const router = Router();

const returnServer = require('./returnServer.js');
const tokenServer = require('./../utilidades/token.js');
const usuarios = require('./../database/crud/usuarios.js');

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
    try {
        if (entrada.token){
            token = entrada.token;
        }
    } catch (error) {
        token = '';
    }

    if (token.length > 0){}else{
        retorno.status.ok = false;
        retorno.status.mensaje = 'Token no valido!!!';
        retorno.data = [];
        res.json(retorno);
        return;
    }

    var validoToken = new tokenServer();
    validoToken.tokenValido(token, (esValido, data) => {
        if (esValido === true){
            if (data.perfil === 'A'){
                var consultaUsuarios = new usuarios(data.usuario);
                consultaUsuarios.consultaUsuarios(0, (ok, data, error) => {
                    if (ok){
                        retorno.status.ok = true;
                        retorno.data = JSON.stringify(data);
                    }else{
                        retorno.status.ok = false;
                        retorno.data = [];
                        if (error.length > 0){
                            retorno.status.mensaje = error;
                        }else{
                            retorno.status.mensaje = "Error desconocido al consultar usuarios.";
                        };
                    };
                    res.json(retorno);
                    return;
                });
            }else{
                retorno.status.ok = false;
                retorno.status.mensaje = 'Usuario sin permisos para esta consulta!!!';
                retorno.data = [];
                res.json(retorno);
                return;
            };
        }else{
            retorno.status.ok = false;
            retorno.status.mensaje = 'Token no valido!!!';
            retorno.data = [];
            res.json(retorno);
            return;
        };
    });
});

module.exports = router;