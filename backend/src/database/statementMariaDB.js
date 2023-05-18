const config = require('../../config.js');
const mariadb = require('mariadb');

const configConexion = {
    host: config.databaseTWFM.host,
    user: config.databaseTWFM.user,
    password: config.databaseTWFM.password,
    database: config.databaseTWFM.database,
    port: config.databaseTWFM.port.toString(),
    connectAttributes: {},
    connectionLimit: 5,
    bigIntAsNumber: true,
    insertIdAsNumber: true
};

class statementMariaDB {
    dbConector;
    constructor(userName) {
        configConexion.connectAttributes = { username: userName };
        this.dbConector = mariadb.createPool(configConexion);
    };

    async conexionDB(callback) {
        try {
            this.dbConector.getConnection()
                .then((connection) => {
                    callback(true, connection, '');
                    return;
                }).catch((err) => {
                    callback(false, null, err);
                    return;
                });
        } catch (error) {
            callback(false, null, error);
            return;
        };
    };

    async query(sql, callback) {
        this.conexionDB((conexionOK, conexion, error) => {
            if (conexionOK) {
                conexion.beginTransaction();
                console.log('EJECUTA QUERY');
                conexion.query(sql)
                    .then(data => {
                        console.log('INGRESA THEN');
                        conexion.commit();
                        conexion.end;
                        callback(true, data, '');
                        return;
                    })
                    .catch(error => {
                        console.log('INGRESA CATCH');
                        console.log(error);
                        conexion.rollback();
                        conexion.end;
                        callback(false, [], error);
                        return;
                    });
            }else{
                callback(false, [], error);
                return;
            };
        });

    };
};

module.exports = statementMariaDB;