import { TemaForo } from "./tema-foro.model";
import { Usuario } from "./usuario.model";

export class MensajeTema {
    constructor(
      public contenido?: string,
      public fechaDeEnviado?: Date,
      public mensajeBloqueado?: boolean,
      public emisorId?: string,
      public emisor?: Usuario,
      public temaForoId?: string,
      public temaForo?: TemaForo,
      public mensajeId?: string
    ) {}
}
