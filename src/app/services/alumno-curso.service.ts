import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlumnoCurso } from '../models/alumno-curso.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoCursoService {

  baseUrl = `${environment.baseUrl}/alumnocurso`;

  constructor(private http: HttpClient) { }

  createAlumnoCurso = (alumnoCurso: AlumnoCurso) => this.http.post(this.baseUrl, alumnoCurso);

  // tslint:disable-next-line: max-line-length
  updateAlumnoCurso = (alumnoCurso: AlumnoCurso) => this.http.put(`${this.baseUrl}`, alumnoCurso);

  getAlumnosCurso = () => this.http.get<AlumnoCurso[]>(this.baseUrl);

  getAlumnoCursoById = (alumnoId: string, cursoId: string) => this.http.get<AlumnoCurso>(`${this.baseUrl}/id/${alumnoId}/${cursoId}`);

  getAlumnoCursoByAlumnoId = (alumnoId: string) => this.http.get<AlumnoCurso[]>(`${this.baseUrl}/byalumno/${alumnoId}`);

  getAlumnoCursoByCursoId = (cursoId: string) => this.http.get<AlumnoCurso[]>(`${this.baseUrl}/bycurso/${cursoId}`);

  deleteAlumnoCurso = (alumnoCursoId: string) => this.http.delete(`${this.baseUrl}/${alumnoCursoId}`);
}
