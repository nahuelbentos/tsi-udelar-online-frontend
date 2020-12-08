import { Actividad } from './actividad.model'
import { Curso } from './curso.model'
import { Foro } from './foro.model'
import { Material } from './material.model'
import { Seccion } from './seccion.model'

export class CursoSeccion {
    constructor(
        public CursoSeccionId?: string,
        public cursoId?: string,
        public curso?: string,
        public cursoData?: Curso,
        public seccionId?: string,
        public seccionData?: Seccion,
        public seccion?: string,

        public actividadLista?: Actividad[],
        public foroLista?: Foro[],
        public materialLista?: Material[],
    ) { }
}