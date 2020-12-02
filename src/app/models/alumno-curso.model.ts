export class AlumnoCurso{
    constructor(
        public alumnoCursoId?: string,
        public alumnoId?: string,
        public cursoId?: string,
        public inscripto?: boolean,
        public calificacion?: number,
        public feedback?: string,
        public fechaActCerrada?: Date
    ){}
}