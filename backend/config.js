const config = {
    ambiente: "Desarrollo",
    databaseTWFM: {
        host: "172.29.208.1",
        user: "wfm",
        password: "wfm",
        database: "wfm",
        port: 3306
        /*
        Dar los permisos al usuario en todo
        GRANT ALL PRIVILEGES ON *.* TO 'wfm'@'%' WITH GRANT OPTION;
        FLUSH PRIVILEGES;
        */
       /*
       Se debe configurar en el archivo my.ini de MariaDB lo siguiente para habilitar y poder utilizar la tabla performance_schema.session_connect_attrs para auditoria
        [mysqld]
        performance_schema = ON
       */
    },
    token:{
        pwd: "Ij7WmCjYjl835xU*kWMs#8y8r1VTs$v1v6%YpZ8Eni^F2WeKai",
        timeExpires:"6h"
    },
    databaseOracle:{
        dirClienteOracle: '/opt/oracle/instantclient_21_10',
        ConfigConexionSARA: {
            user: "WFM_INTEMP",
            password: "Nv4NT143Po",
            connectString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=172.18.50.80)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=DSARA)))",
            externalAuth: false
        },
        ConfigConexionBI: {
            user: "WFM_INTCOM",
            password: "Nv4NT143Po",
            connectString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=172.18.50.235)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SID=MDREIDA)))",
            externalAuth: false
        }
    }
};

module.exports = config;