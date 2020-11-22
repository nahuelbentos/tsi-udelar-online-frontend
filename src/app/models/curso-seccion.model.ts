import { Curso } from './curso.model'
import { Seccion } from './seccion.model'

export class CursoSeccion {
    constructor(
        public CursoSeccionId: string,
        public CursoId: string,
        public Curso: Curso,
        public SeccionId: string,
        public Seccion: Seccion
    ) { }
}