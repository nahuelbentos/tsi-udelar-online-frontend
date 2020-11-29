import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CursoSeccion } from '../models/curso-seccion.model';

@Injectable({
  providedIn: 'root',
})

export class CursoSeccionService {
  baseUrl = `${environment.baseUrl}/cursoseccion`;

  constructor(private http: HttpClient) { }

  createCursoSeccion = (cursoseccion: CursoSeccion) => this.http.post(this.baseUrl, cursoseccion);

  updateCursoSeccion = (cursoseccion: CursoSeccion) => this.http.put(`${this.baseUrl}/${cursoseccion.CursoSeccionId}`, cursoseccion);

  getCursosSeccion = () => this.http.get<CursoSeccion[]>(this.baseUrl);

  getCursoSeccionById = (cursoseccionId: string) => this.http.get<CursoSeccion>(`${this.baseUrl}/${cursoseccionId}`);

  deleteCursoSeccion = (cursoseccionId: string) => this.http.delete(`${this.baseUrl}/${cursoseccionId}`);
}
