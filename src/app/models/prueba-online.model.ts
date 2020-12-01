export class PruebaOnline{
    constructor(
        public pruebaOnlineId? : string,
        public url?: string,
        public minutosExpiracion?: number,
        public activa?: boolean,
        public fecha?: Date,
        public usuarioId?: string
    ){}
}