export class RespuestaPrueba {
  constructor(
    public preguntaRespuestaId?: string,
    public pregunta?: string,
    public respuestasPosibles?: string[],
    public respuestaId?: number,
    public respuestaCorrecta?: number,
    public puntos?: number,
    public resta?: boolean
  ) {}
}
 