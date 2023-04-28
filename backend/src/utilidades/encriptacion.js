const bcrypt = require('bcryptjs');

class encriptacion{

    encriptar(data, callback){
        bcrypt.genSalt(10, function(err, salt) {
            if (err){
                callback('', err);
            }else{
                bcrypt.hash(data, salt, function(err, hash) {
                    callback(hash, err);
                });
            };
        });
    };

    comparar(dato, datoEncriptado, callback){
        bcrypt.compare(dato, datoEncriptado, function(err, res) {
            if (res === true){
                callback(true);
                return;
            };
            callback(false);
            return;
        });
    };
};

module.exports = encriptacion;