import { ModalidadCurso } from './modalidad-curso.enum';
import { TemplateCurso } from './template-curso.model';

export class Curso {
  constructor(
    public nombre: string,
    public descripcion?: string,
    public modalidad?: ModalidadCurso,
    public requiereMatriculacion?: boolean,
    public salaVirtual?: string,
    public templateCursoId?: string,
    public templateCurso?: TemplateCurso,
    public usuarios?: Usuario[],
    public cursoId?: string
  ) {}
}

interface Usuario {
  userId: string;
  nombreCompleto: string;
  userName: string;
  email: string;
  phoneNumber: string;
}
