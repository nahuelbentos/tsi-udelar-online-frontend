export class Mensaje {
    constructor(
        public mensajeId?: string,
        public emisorId?: string,
        public contenido?: string,
        public fechaDeEnviado?: Date,
    ) { }
}