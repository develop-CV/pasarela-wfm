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
    /*trace: true*/
};

class statementMariaDB {
    dbConector;
    constructor(userName) {
        configConexion.connectAttributes = { username: userName };
        this.dbConector = mariadb.createPool(configConexion);
    };

    async conexionDB() {
        return new Promise((resolve, reject) => {
            try {
                this.dbConector.getConnection()
                    .then((connection) => {
                        resolve(connection);
                        return;
                    }).catch((err) => {
                        reject(err);
                        return;
                    }).finally(() => {
                    });
            } catch (error) {
                reject(error);
                return;
            };
        });
    };

    async query(sql, callback) {
        this.conexionDB().then(conexion => {
            conexion.beginTransaction();
            //console.log('EJECUTA QUERY');
            conexion.query(sql)
                .then(data => {
                    //console.log('INGRESA THEN');
                    conexion.commit();
                    conexion.end;
                    conexion.destroy()
                    this.dbConector.end();
                    callback(true, data, '');
                    return;
                })
                .catch(error => {
                    //console.log('INGRESA CATCH');
                    console.log(error);
                    conexion.rollback();
                    conexion.end;
                    conexion.destroy()
                    this.dbConector.end();
                    callback(false, [], error);
                    return;
                });
        }).catch(error => {
            this.dbConector.end();
            callback(false, [], error);
        });

    };
};

module.exports = statementMariaDB;