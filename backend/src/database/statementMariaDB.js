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

    conexionDB() {
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

    query(sql, callback) {
        var executeQuery = (sql) => {
            return new Promise((resolve, reject) => {
                this.conexionDB().then(conexion => {
                    conexion.beginTransaction();
                    //console.log('EJECUTA QUERY');
                    conexion.query(sql)
                        .then(data => {
                            //console.log('INGRESA THEN', sql.length);
                            conexion.commit();
                            conexion.end;
                            conexion.destroy();
                            this.dbConector.end().finally(() => {
                                resolve([true, data, '']);
                                return;
                            });
                        })
                        .catch(error => {
                            //console.log('INGRESA CATCH', sql);
                            console.log(error);
                            conexion.rollback();
                            conexion.end;
                            conexion.destroy();
                            this.dbConector.end().finally(() => {
                                reject([false, [], error]);
                                return;
                            });
                        });
                }).catch(error => {
                    this.dbConector.end().finally(() => {
                        reject([false, [], error]);
                        return;
                    });
                });
            });
        };

        try {
            executeQuery(sql).then(dataReturn => {
                callback(dataReturn[0], dataReturn[1], dataReturn[2]);
            }).catch(error => {
                callback(error[0], error[1], error[2]);
            });
        } catch (error) {
            callback(false, [], error);
        }
        return;
    };
};

module.exports = statementMariaDB;