import { Respuesta } from './respuesta.model';

export class PreguntaRespuesta{
  constructor(
      public preguntaRespuestaId?: string,
      public pregunta?: string,
      public respuesta1?: string,
      public respuesta2?: string,
      public respuesta3?: string,
      public respuesta4?: string,
      public respuestas?: Respuesta[],
      public respuestaCorrecta?: number,
      public puntos?: number,
      public resta?: boolean,
  ){}
}
