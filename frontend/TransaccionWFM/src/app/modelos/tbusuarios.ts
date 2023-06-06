export interface Tbusuarios {
    id: bigint,
    idTipoIdentificacion: bigint,
    identificacion: string,
    nombreCompleto: string,
    correo: string,
    perfil: string,
    esActivo:boolean,
    esNuevoPassword: boolean,
    esEliminado: boolean
}
