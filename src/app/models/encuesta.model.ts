export class Encuesta {
  constructor(
    public nombre: string,
    public encuestaId?: string,
    public descripcion?: string,
    public esAdministradorFacultad?: boolean,
  ) {}
}
