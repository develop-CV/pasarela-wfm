
function consumir() {
    return new Promise((resolve, reject) => {
        try {
            const consumo = require('./servers/consumoServicios.js');
            let consumir = new consumo();
            consumir.cargarTransaccional().then(data => { resolve(data) }).catch(error => { reject(error) }).finally(() => { });
        } catch (error) {
            reject(error);
        };
        return;
        /*
       const consumo = require('./database/crud/sara.js');
       let consumirA = new consumo();
       consumirA.transaccionalParametrosConsulta().then(data => {
        console.log(data);
        var fecha = ("00" + data.fechaInicial.getDate()).slice(-2) + "/" +
                    ("00" + (data.fechaInicial.getMonth() + 1)).slice(-2) + "/" +
                    data.fechaInicial.getFullYear() + " " +
                    ("00" + data.fechaInicial.getHours()).slice(-2) + ":" +
                    ("00" + data.fechaInicial.getMinutes()).slice(-2) + ":" +
                    ("00" + data.fechaInicial.getSeconds()).slice(-2);
        console.log(fecha)
       })
       */
    })
}

consumir().then((data) => {
    console.log('FIN...', data);
    return;
    //process.exit();
}).catch(error => {
    console.log('ERROR...: ', error);
    return;
});


function fechas() {
    var nDias = 7;
    var fechaFin = new Date();
    fechaFin.setDate(fechaFin.getDate() - 1);
    fechaFin = new Date(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate(), 23, 59, 59, 59);
    var fechaIni = new Date();
    fechaIni.setDate(fechaFin.getDate() - nDias);
    fechaIni = new Date(fechaIni.getFullYear(), fechaIni.getMonth(), fechaIni.getDate(), 0, 0, 0, 0);

    console.log('Fecha Inicial:', fechaIni);
    console.log('Año:', fechaIni.getFullYear());
    console.log('Mes:', fechaIni.getMonth() + 1);
    console.log('Dia:', fechaIni.getDate());
    console.log('Hora:', fechaIni.getHours());
    console.log('Minuto:', fechaIni.getMinutes());
    console.log('Segundos:', fechaIni.getSeconds());
    console.log('Segundos:', fechaIni.getMilliseconds());
    
    console.log('Fecha Final:', fechaFin);
    console.log('Año:', fechaFin.getFullYear());
    console.log('Mes:', fechaFin.getMonth() + 1);
    console.log('Dia:', fechaFin.getDate());
    console.log('Hora:', fechaFin.getHours());
    console.log('Minuto:', fechaFin.getMinutes());
    console.log('Segundos:', fechaFin.getSeconds());
    console.log('Segundos:', fechaFin.getMilliseconds());
    
};

function fecha2(){
    const maestro = require('./database/crud/sara.js');
    var consulta = new maestro();
    consulta.transaccionalParametrosConsulta().then(data => {
        console.log(data);
    }).catch(error => {
        console.log(error);
    });
}
