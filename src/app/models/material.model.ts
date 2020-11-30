export class Material {
  constructor(
    public nombre: string,
    public descripcion?: string,
    public archivoData?: string,
    public archivoNombre?: string,
    public archivoExtension?: string,
    public materialId?: string,
    public cursoId?: string,
    public seccionId?: string,
  ) {}
}
