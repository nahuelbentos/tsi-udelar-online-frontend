export class Actividad {
  constructor(
    public nombre: string,
    public actividadId?: string,
    public descripcion?: string,
    public esAdministradorFacultad?: boolean
  ) {}
}
