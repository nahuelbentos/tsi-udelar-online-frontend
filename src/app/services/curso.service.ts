import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Curso } from '../models/curso.model';
import { TemplateCurso } from '../models/template-curso.model';
import { AutenticacionService } from './autenticacion.service';


@Injectable({
  providedIn: 'root',
})
export class CursoService {
  baseUrl = `${environment.baseUrl}/curso`;

  constructor(private http: HttpClient ) {}

  createCurso = (curso: Curso) => this.http.post(this.baseUrl, curso);

  updateCurso = (curso: Curso) => this.http.put(`${this.baseUrl}/${curso.cursoId}`, curso);

  getCursos = () => this.http.get<Curso[]>(this.baseUrl);

  getCursosByUsuario = ( id: string) => this.http.get<Curso[]>(`${this.baseUrl}/usuario/${id}`);
  
  getCursosByFacultad = (id: string) => this.http.get<Curso[]>(`${this.baseUrl}/facultad/${id}`);
  
  getCursosByCarrera = (id: string) => this.http.get<Curso[]>(`${this.baseUrl}/carrera/${id}`);

  getCursoById = (cursoId: string) => this.http.get<Curso>(`${this.baseUrl}/${cursoId}`);

  deleteCurso = (cursoId: string) => this.http.delete(`${this.baseUrl}/${cursoId}`);

  getTemplateCursos = () => this.http.get<TemplateCurso[]>(`${environment.baseUrl}/templateCurso`);

  addDocente = (cursoId: string, docenteId: string) => this.http.post(`${this.baseUrl}/docente`, { cursoId, docenteId });

  // removeDocente = (cursoId: string, docenteId: string) => this.http.delete(`${this.baseUrl}/docente/${cursoId}/${docenteId}`);
}
