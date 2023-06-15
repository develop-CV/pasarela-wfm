
function consumir(){
    return new Promise((resolve, reject) => {
        const consumo = require('./servers/consumoServicios.js')
        let consumir = new consumo();
        consumir.cargarTrabajadores().then().catch().finally(() => {
            resolve();
        });
    })
}

consumir().then(() => {
    console.log('FIN...');
    process.exit();
});