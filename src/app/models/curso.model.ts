import { Comunicado } from './Comunicado';
import { CursoSeccion } from './curso-seccion.model';
import { ModalidadCurso } from './modalidad-curso.enum';
import { Seccion } from './seccion.model';
import { TemplateCurso } from './template-curso.model';
import { Usuario } from './usuario.model';

export class Curso {
  constructor(
    public nombre: string,
    public descripcion?: string,
    public modalidadId?: ModalidadCurso,
    public modalidad?: string,
    public requiereMatriculacion?: boolean,
    public salaVirtual?: string,
    public templateCursoId?: string,
    public templateCurso?: TemplateCurso,
    public actaCerrada?: boolean,
    public usuarios?: Usuario[],
    public secciones?: Seccion[],
    public alumnos?: Usuario[],
    public docentes?: Usuario[],
    public comunicados?: Comunicado[],
    public cursoSecciones?: CursoSeccion[],
    public cursoId?: string
  ) {}
}
