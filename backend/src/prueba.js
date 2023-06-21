
function consumir(){
    return new Promise((resolve, reject) => {
        const consumo = require('./servers/consumoServicios.js')
        let consumir = new consumo();
        consumir.cargarTransaccional().then(data => {resolve('')}).catch(error => {reject(error)}).finally(() => {});
        
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
    //process.exit();
}).catch(error => {
    console.log('ERROR...: ', error);
});