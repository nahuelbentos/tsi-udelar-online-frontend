import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Seccion } from '../models/seccion.model';
import { TemplateCursoSeccion } from '../models/template-curso-seccion.model';

@Injectable({
  providedIn: 'root',
})

export class TemplateCursoSeccionService {
  baseUrl = `${environment.baseUrl}/templatecursoseccion`;

  constructor(private http: HttpClient) { }

  createTemplateCursoSeccion = (templatecursoseccion: TemplateCursoSeccion) => this.http.post(this.baseUrl, templatecursoseccion);

  updateTemplateCursoSeccion = (templatecursoseccion: TemplateCursoSeccion) => this.http.put(`${this.baseUrl}/${templatecursoseccion.TemplateCursoId}`, templatecursoseccion);

  getCTemplatesCursoSeccion = () => this.http.get<TemplateCursoSeccion[]>(this.baseUrl);

  getTemplateCursoSeccionById = (templateCursoId: string, seccionId: string) => this.http.get<TemplateCursoSeccion>(`${this.baseUrl}/${templateCursoId}/${seccionId}`);

  getTemplateCursoSeccionByTemplate = (templateCursoId: string) => this.http.get<TemplateCursoSeccion>(`${this.baseUrl}/templateCursoId/${templateCursoId}`);

  deleteTemplateCursoSeccion = (templatecursoseccionId: string) => this.http.delete(`${this.baseUrl}/${templatecursoseccionId}`);

  getSeccionesByTempalete = (templateCursoId: string) =>  this.http.get<Seccion[]>(`${this.baseUrl}/secciones-by-template/${templateCursoId}`);
}
