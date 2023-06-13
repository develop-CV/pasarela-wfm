const oracledb = require('oracledb');
const conf = require('../../config');

oracledb.initOracleClient({ libDir: conf.databaseOracle.dirClienteOracle }); // Se asigna la direccion del cliente de ORACLE

class statement {
    conn;
    configConexion;
    
    constructor(dataBaseConnect) {
        switch (dataBaseConnect) {
            case 'SARA':
                this.configConexion = conf.databaseOracle.ConfigConexionSARA;
                break;
            case 'BI':
                this.configConexion = conf.databaseOracle.ConfigConexionBI;
                break;
            default:
                break;
        };
    };
    
    async connect(callback) {
        try {
            await oracledb.getConnection(this.configConexion, (error, conexion) => {  // Conectar con la base de datos
                if(error){
                    callback(false, error, conexion);
                }else{
                    this.conn = conexion;
                    callback(true, '', conexion);
                }
            });
        } catch (err) {
            console.error(err);
            //process.exit(1);
            callback(false, err, '');
        }
    };
    
    async execSelect(sqlQuery, callback) {
        var datosReturn = [];
        this.connect((estado, error, conexion) => {
            if (estado) {
                try {
                    oracledb.outFormat = oracledb.OBJECT;   // Formato de salida JSON
                    oracledb.fetchAsString = [ oracledb.CLOB ]; // Para tomar CLOB como Caracteres
                    conexion.execute(sqlQuery, (err, result) => {
                        if (err){
                            callback(false, datosReturn, [], err);
                        }else{
                            datosReturn = result.rows;
                            callback(true, datosReturn, result.metaData, '');
                        }
                    });
                } catch (err) {
                    callback(false, datosReturn, err);
                } finally {
                    if (conexion) {
                        conexion.close();
                    }
                }
            } else {
                callback(false, datosReturn, [], error);
            }
        });
    };
};

module.exports = statement;