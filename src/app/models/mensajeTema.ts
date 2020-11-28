export class MensajeTema {
    constructor(
      public contenido: string,
      public fechaDeEnviado?: Date,
      public mensajeBloqueado?: boolean,
      public emisorId?: string,
      public temaForoId?: string,
      public mensajeId?: string
    ) {}
}
