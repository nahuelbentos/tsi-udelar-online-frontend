import { Seccion } from './seccion.model';

export class TemplateCurso {
  constructor(
    public nombre: string,
    public descripcion?: string,
    public templateCursoId?: string,
    public secciones?: Seccion[]
  ) {}
}
