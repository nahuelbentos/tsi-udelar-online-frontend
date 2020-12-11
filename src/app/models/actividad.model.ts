import { Curso } from './curso.model';

export class Actividad {
  constructor(
    public nombre?: string,
    public tipo?: string,
    public fechaRealizada?: Date,
    public fechaFinalizada?: Date,
    public descripcion?: string,
    public esAdministradorFacultad?: boolean,
    public esIndividual?: boolean,
    public calificacion?: number,
    public nota?: string,
    public archivoData?: string,
    public archivoNombre?: string,
    public archivoExtension?: string,
    public fecha?: Date,
    public url?: string,
    public minutosExpiracion?: number,
    public activa?: boolean,
    public actividadId?: string,
    public cursoId?: string,
    public curso?: Curso,
    public preguntaLista?: Pregunta[],
    public usuarioId?: string,
  ) {}
}

 export class Pregunta{
   constructor(

    public preguntaId: string ,
    public texto: string ,
    public encuesta: Actividad ,
    public encuestaId: string ,
    public respuestaLista: string ,
   ){

   }
 }

 
 
