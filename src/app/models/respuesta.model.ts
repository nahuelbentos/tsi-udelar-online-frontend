export class Respuesta {
    constructor(
        public preguntaId: string,
        public respuestaId: string,
        public mensaje: string,
        public usuario?: string,
    ) { }
}
