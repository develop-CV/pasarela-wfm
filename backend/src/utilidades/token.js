const jwt = require('jsonwebtoken');
const config = require('../../config.js');

class token{
    constructor(){
        this.privateKey = config.token.pwd;
        this.timeExpires = config.token.timeExpires;
    };

    generarToken(data, callback){
        let token = '';
        if (data){
            if (typeof(data) == 'object'){
                if (JSON.stringify(data).toString().length > 0){
                    token = jwt.sign(data, this.privateKey, {expiresIn: this.timeExpires});
                };
            };
        };
        
        callback(token);
    };

    decodificarToken(token, callback){
        if (token){
            if (token.toString().length > 0){
                jwt.verify(token, this.privateKey, (error, decoded) => {
                    if (error){
                        callback('');
                    }
                    callback(decoded);
                });
            };
        };
    };

    tokenValido(token, callback){
        try {
            if (token.length > 0){}else{
                callback(false, {});
            }
        } catch (error) {
            callback(false, {});
        };
        
        this.decodificarToken(token, (datosUsuario) => {
            try {
                if (datosUsuario.id > 0) {
                    callback(true, datosUsuario);
                };
            } catch (error) {
                callback(false, {});
            }
        });
    };
}

module.exports = token;