import { TemplateCurso } from './template-curso.model'
import { Seccion } from './seccion.model'

export class TemplateCursoSeccion {
    constructor(
        public TemplateCursoSeccionId?: string,
        public TemplateCursoId?: string,
        public TemplateCurso?: TemplateCurso,
        public SeccionId?: string,
        public Seccion?: Seccion,
        public Secciones?: Seccion[]
    ) { }
}