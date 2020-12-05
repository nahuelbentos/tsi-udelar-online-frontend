import { UsuarioSesion } from './usuario-sesion.model';

export class Comunicado {
    constructor(
      public nombre: string,
      public descripcion: string,
      public url: string,
      public usuarioEmail?: string,
      public comunicadoId?: string,
      public facultadId?: string,
    ) {}
}
