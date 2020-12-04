import { Curso } from './curso.model';
import { Usuario } from './usuario.model';

export class AlumnoCurso {
  constructor(
    public alumno?: string,
    public alumnoId?: string,
    public curso?: string,
    public cursoId?: string,
    public inscripto?: boolean,
    public calificacion?: number,
    public feedback?: string,
    public fechaActaCerrada?: Date,
    public dataAlumno?: Usuario,
    public dataCurso?: Curso
  ) {}
}
