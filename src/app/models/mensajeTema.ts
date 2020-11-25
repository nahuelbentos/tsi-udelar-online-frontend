export class MensajeTema {
    constructor(
      public contenido: string,
      public fechaDeEnviado?: Date,
      public mensajeBloqueado?: boolean,
      public usuarioId?: string,
      public temaForoId?: string,
      public mensajeTemaId?: string
    ) {}
}
