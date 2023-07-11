const config = require('../../../config.js');
var request = require('request');

class consumoWFM {
    tipoConsumo;
    constructor(tipo) {
        switch (tipo) {
            case 'Trabajadores':
                this.tipoConsumo = 'trabajadores/';
                break;
            case 'Transaccional':
                this.tipoConsumo = 'transaccional/';
                break;
            default:
                this.tipoConsumo = '';
                break;
        };
    };
    
    autenticar() {
        return new Promise((resolve, reject) => {
            if (this.tipoConsumo.length > 0) {
                var options = {
                    'method': 'POST',
                    'url': config.serverWFM.url + this.tipoConsumo + 'autenticar',
                    'headers': {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "IdentificadorCliente": config.serverWFM.identificadorCliente,
                        "CodigoSeguridad": config.serverWFM.codigoSeguridad
                    })
                    
                };
                request(options, function (error, response) {
                    if (error){
                        reject(error);
                    }else{
                        if (response.body){
                            if (response.body.length > 0){
                                var token = response.body;
                                if (token.at(0) == '"' && token.at(token.length - 1) == '"'){
                                    token = token.substr(1, token.length - 2);
                                };
                                resolve(token);
                            }else{
                                reject('No se recibio token en la autenticación');
                            };
                        }else{
                            reject('No se recibio body en la autenticación');
                        };
                    };
                    return;
                });
            } else {
                reject('No se reconoce el Tipo de Consumo enviado en el constructor.');
                return;
            };
        });
    };

    procesar(token, dataJSON, idCarga) {
        return new Promise((resolve, reject) => {
            if (this.tipoConsumo.length > 0) {
                var options = {
                    'method': 'POST',
                    'url': config.serverWFM.url + this.tipoConsumo + 'procesar',
                    'headers': {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(dataJSON)
                    
                };
                request(options, function (error, response) {
                    if (error){
                        reject(error);
                    }else{
                        if (response.body){
                            if (response.body.length > 0){
                                resolve(response.body);
                            }else{
                                reject('No se recibio respuesta en el procesar');
                            };
                        }else{
                            reject('No se recibio body en procesar');
                        };
                    };
                    return;
                });
            } else {
                reject('No se reconoce el Tipo de Consumo enviado en el constructor.');
                return;
            };
        });
    };
}

module.exports = consumoWFM;