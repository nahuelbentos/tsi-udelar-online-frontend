import { Comunicado } from './Comunicado';
import { Facultad } from './facultad.model';

export class ComunicadoFacultad {
    constructor(
      public comunicadoId?: string,
      public facultadId?: string,
      public facultad?: Facultad,
      public comunicado?: Comunicado
    ) {}
}
