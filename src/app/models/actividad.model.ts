export class Actividad {
  constructor(
    public nombre: string,
    public tipo?: string,
    public fechaRealizada?: Date,
    public fechaFinalizada?: Date,
    public descripcion?: string,
    public esAdministradorFacultad?: boolean,
    public actividadId?: string,
  ) {}
}
