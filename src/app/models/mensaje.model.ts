export class Mensaje {
    constructor(
        public mensajeId?: string,
        public emisor?: string,
        public mensaje?: string,
        public fechaEnviado?: Date,
    ) { }
}