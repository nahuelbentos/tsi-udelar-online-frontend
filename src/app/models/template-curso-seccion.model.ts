import { TemplateCurso } from './template-curso.model';
import { Seccion } from './seccion.model';

export class TemplateCursoSeccion {
    constructor(
        public templateCurso?: TemplateCurso,
        public templateCursoSeccionId?: string,
        public templateCursoId?: string,
        public seccionId?: string,
        public seccion?: Seccion,
        public secciones?: string[]
    ) { }
}
