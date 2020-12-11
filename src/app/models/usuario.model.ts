import { Facultad } from './facultad.model';
import { TipoUsuario } from './tipo-usuario.enum';

export class Usuario {
  constructor(
    public nombres: string,
    public apellidos?: string,
    public ci?: string,
    public fechaNacimiento?: Date,
    public direccion?: string,
    public telefono?: string,
    public email?: string,
    public emailPersonal?: string,
    public userName?: string,
    public password?: string,
    public facultadId?: string,
    public tipo?: TipoUsuario,
    public facultad?: Facultad,
    public usuarioId?: string,
    public id?: string,
    public mensajeVisto?: boolean,
    public mensajeTimestamp?: Date,
    public urlFotoPerfil?: Date,
  ) {}
}

