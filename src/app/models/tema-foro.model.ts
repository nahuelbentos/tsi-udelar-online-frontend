import { Usuario } from './usuario.model';

export class TemaForo {
  constructor(
    public temaForoId?: string,
    public asunto?: string,
    public mensaje?: string,
    public emisorId?: string,
    public emisor?: Usuario,
    public archivoData?: string,
    public archivoNombre?: string,
    public archivoExtension?: string,
    public subscripcionADiscusion?: boolean
  ) { }
}
