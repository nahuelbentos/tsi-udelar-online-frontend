import { Curso } from './curso.model'
import { Seccion } from './seccion.model'

export class CursoSeccion {
    constructor(
        public CursoSeccionId ?: string,
        public cursoId ?: string,
        public curso ?: Curso,
        public seccionId ?: string,
        public seccion ?: Seccion
    ) { }
}