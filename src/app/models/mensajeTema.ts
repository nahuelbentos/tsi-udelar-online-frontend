export class MensajeTema {
    constructor(
      public contenido: string,
      public fechaDeEnviado?: Date,
      public mensajeBloqueado?: boolean,
      public usuarioEmail?: string,
      public temaForoId?: string,
      public mensajeTemaId?: string
    ) {}
}
