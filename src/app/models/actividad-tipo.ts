import { Actividad } from './actividad.model';

export  class ActivdadTipo {
    constructor(
      public tipo: string,
      public actividad: Actividad
    ) {}
  }