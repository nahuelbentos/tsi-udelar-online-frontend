import { Usuario } from './usuario.model';

export class Facultad {
  constructor(
    public nombre: string,
    public descripcion?: string,
    public urlAcceso?: string,
    public fechaNacimiento?: Date,
    public dominioMail?: string,
    public usuarioLista?: Usuario[],
    public facultadId?: string
  ) {}
}
