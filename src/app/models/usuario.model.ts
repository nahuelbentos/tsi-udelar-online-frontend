import { TipoUsuario } from './tipo-usuario.enum';

export class Usuario {
  constructor(
    public nombres: string,
    public apellidos?: string,
    public cedula?: string,
    public fechaNacimiento?: Date,
    public direccion?: string,
    public telefono?: string,
    public emailPersonal?: string,
    public userName?: string,
    public password?: string,
    public facultadId?: string,
    public tipo?: TipoUsuario,
    public facultad?: UsuarioFacultad,
    public usuarioId?: string
  ) {}
}

interface UsuarioFacultad {
  facultadId?: string;
  nombre?: string;
}
