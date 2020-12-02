import { Actividad } from './actividad.model'
import { Curso } from './curso.model'
import { Foro } from './foro.model'
import { Material } from './material.model'
import { Seccion } from './seccion.model'

export class CursoSeccion {
    constructor(
        public CursoSeccionId?: string,
        public cursoId?: string,
        public curso?: Curso,
        public seccionId?: string,
        public seccion?: Seccion,

        public actividadLista?: Actividad[],
        public foroLista?: Foro[],
        public materialLista?: Material[],
    ) { }
}