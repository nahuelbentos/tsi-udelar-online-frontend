import { PreguntaRespuesta } from './pregunta-respuesta.model';

export class PruebaOnline {
  constructor(
    public nombre?: string,
    public descripcion?: string,
    public fechaRealizada?: Date,
    public fechaFinalizada?: Date,
    public pruebaOnlineId?: string,
    public actividadId?: string,
    public url?: string,
    public minutosExpiracion?: number,
    public activa?: boolean,
    public fecha?: Date,
    public usuarioId?: string,
    public listaPreguntaRespuesta?: PreguntaRespuesta[]
  ) {}
}
