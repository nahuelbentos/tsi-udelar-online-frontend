import { Facultad } from './facultad.model';
import { TipoUsuario } from './tipo-usuario.enum';

export class UsuarioSesion {
  constructor(
    public nombres: string,
    public apellidos?: string,
    public emailPersonal?: string,
    public ci?: string,
    public token?: string,
    public email?: string,
    public userName?: string,
    public rol?: string,
    public tipo?: TipoUsuario,
    public facultad?: Facultad
  ) {}
}
