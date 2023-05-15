const config = {
    ambiente: "Desarrollo",
    databaseTWFM: {
        host: "localhost",
        user: "root",
        password: "cruzverde",
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
    }
};

module.exports = config;