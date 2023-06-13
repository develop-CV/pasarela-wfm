export interface Tbservicioshorarios {
    id:bigint,
    idServicio:bigint,
    hora:TimeRanges,
    esActivo:boolean,
    accion?:string
}
