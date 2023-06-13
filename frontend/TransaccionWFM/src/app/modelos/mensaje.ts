export interface Mensaje {
    titulo: string,
    mensaje: string,
    opciones: {
        value: any,
        texto: string,
        color?: string,
        ejecutar?: Function
    }[]
}
