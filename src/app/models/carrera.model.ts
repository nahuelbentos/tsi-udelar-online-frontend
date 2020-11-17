import { Facultad } from './facultad.model';

export class Carrera {
  constructor(
    public nombre: string,
    public descripcion?: string,
    public facultad?: Facultad,
    public facultadId?: string,
    public carreraId?: string
  ) {}
}
