import { TemplateCurso } from './template-curso.model'
import { Seccion } from './seccion.model'

export class TemplateCursoSeccion {
    constructor(
        public TemplateCurso?: TemplateCurso,
        public TemplateCursoSeccionId?: string,
        public TemplateCursoId?: string,
        public SeccionId?: string,
        public seccion?: Seccion,
        public secciones?: string[]
    ) { }
}
