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
    }
};

module.exports = config;