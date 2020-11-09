import { Usuario } from './usuario.model';

export class Facultad {
  constructor(
    public nombre: string,
    public descripcion?: string,
    public urlAcceso?: string,
    public dominioMail?: string,
    public usuarioLista?: Usuario[],
    public facultadId?: string,
    public colorPrincipal?: string,
  ) {}
}
