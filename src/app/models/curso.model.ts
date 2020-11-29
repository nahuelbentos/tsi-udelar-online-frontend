import { ModalidadCurso } from './modalidad-curso.enum';
import { Seccion } from './seccion.model';
import { TemplateCurso } from './template-curso.model';
import { Usuario } from './usuario.model';

export class Curso {
  constructor(
    public nombre: string,
    public descripcion?: string,
    public modalidad?: ModalidadCurso,
    public modalidadTexto?: string,
    public requiereMatriculacion?: boolean,
    public salaVirtual?: string,
    public templateCursoId?: string,
    public templateCurso?: TemplateCurso,
    public actaCerrada?: boolean,
    public usuarios?: Usuario[],
    public secciones?: Seccion[],
    public alumnos?: Usuario[],
    public docentes?: Usuario[],
    public cursoId?: string
  ) {}
}
