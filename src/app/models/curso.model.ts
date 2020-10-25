import { ModalidadCurso } from './modalidad-curso.enum';

export class Curso {
  constructor(
    public nombre: string,
    public descripcion?: string,
    public modalidadCurso?: ModalidadCurso,
    public requiereMatriculacion?: boolean,
    public salaVirtual?: string,
    public templateCursoId?: string,
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
