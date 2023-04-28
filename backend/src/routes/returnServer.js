
class returnServer{
    datoReturn =  {
        status:{
            ok: false,
            mensaje: ''
        },
        data: []
    };

    constructor(){
        this.datoReturn.status.ok = false;
        this.datoReturn.status.mensaje = '';
        this.datoReturn.data = [];
    };
};

module.exports = returnServer;