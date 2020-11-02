export class Comunicado {
    constructor(
      public nombre: string,
      public descripcion: string,
      public url: string,
      public comunicadoId?: string
    ) {}
}
