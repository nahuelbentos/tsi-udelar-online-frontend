import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  baseUrl = `${environment.baseUrl}/curso`;

  constructor(private http: HttpClient) {}

  createCurso(curso: Curso) {
    return this.http.post(this.baseUrl, curso);
  }

  getCursos() {
    return this.http.get<Curso[]>(this.baseUrl);
  }

  deleteCurso(cursoId: string) {
    return this.http.delete(`${this.baseUrl}/${cursoId}`);
  }
}
