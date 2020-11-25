import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TemplateCurso } from '../models/template-curso.model';

@Injectable({
  providedIn: 'root'
})
export class TemplatecursoService {
  baseUrl = `${environment.baseUrl}/templatecurso`;

  constructor(private http: HttpClient) {}

  createTemplateCurso(templateCurso: TemplateCurso) {
    return this.http.post(this.baseUrl, templateCurso);
  }

  getTemplateCursos() {
    return this.http.get<TemplateCurso[]>(this.baseUrl);
  }

  deleteTemplateCurso(templateCursoId: string) {
    return this.http.delete(`${this.baseUrl}/${templateCursoId}`);
  }

  updateTemplateCurso = (templateCurso: TemplateCurso) =>
  this.http.put(`${this.baseUrl}/${templateCurso.templateCursoId}`, templateCurso)

  getTemplateCursoById = (templateCursoId: string) =>
    this.http.get<TemplateCurso>(`${this.baseUrl}/id/${templateCursoId}`)
}
