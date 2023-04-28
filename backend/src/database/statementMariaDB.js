const config = require('../../config.js');
const mariadb = require('mariadb');

const configConexion = {
    host: config.databaseTWFM.host,
    user: config.databaseTWFM.user,
    password: config.databaseTWFM.password,
    database: config.databaseTWFM.database,
    port: config.databaseTWFM.port.toString(),
    connectAttributes: {},
    connectionLimit: 5
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
                conexion.query(sql)
                    .then(data => {
                        conexion.commit();
                        conexion.end;
                        callback(true, data[0], '');
                        return;
                    })
                    .catch(error => {
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