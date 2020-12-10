import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Carrera } from '../models/carrera.model';

@Injectable({
  providedIn: 'root',
})
export class CarreraService {
  baseUrl = `${environment.baseUrl}/carrera`;

  constructor(private http: HttpClient) {}

  createCarrera = (carrera: Carrera) => this.http.post(this.baseUrl, carrera);

  updateCarrera = (carrera: Carrera) => this.http.put(`${this.baseUrl}/${carrera.carreraId}`, carrera);

  getCarreras = () => this.http.get<Carrera[]>(this.baseUrl);

  getCarreraByfacultad = (facultadId: string) => this.http.get<Carrera[]>(`${this.baseUrl}/facultad/${facultadId}`);

  getCarreraById = (carreraId: string) => this.http.get<Carrera>(`${this.baseUrl}/${carreraId}`);

  deleteCarrera = (carreraId: string) => this.http.delete(`${this.baseUrl}/${carreraId}`);

  addCurso = (carreraId: string, cursoId: string) => this.http.post(`${this.baseUrl}/curso`, { carreraId, cursoId });

  removeCurso = (carreraId: string, cursoId: string) => this.http.delete(`${this.baseUrl}/curso/${carreraId}/${cursoId}`);
}
