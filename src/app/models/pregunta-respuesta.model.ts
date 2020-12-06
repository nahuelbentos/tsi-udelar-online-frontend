import { Respuesta } from './respuesta.model';

export class PreguntaRespuesta{
  constructor(
      public pregunta: string,
      public preguntaRespuestaId?: string,
      public respuestas?: Respuesta[],
      public respuestaCorrecta?: number,
      public puntos?: number,
      public resta?: boolean,
  ){}
}
