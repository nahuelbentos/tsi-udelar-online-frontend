import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Seccion } from '../models/seccion.model'; 

@Injectable({
  providedIn: 'root',
})
export class SeccionService {

  baseUrl = `${environment.baseUrl}/seccion`;

  constructor(private http: HttpClient) {}

  createSeccion = (seccion: Seccion) => this.http.post(this.baseUrl, seccion);

  updateSeccion = (seccion: Seccion) => this.http.put(`${this.baseUrl}/${seccion.seccionId}`, seccion);

  getSecciones = () => this.http.get<Seccion[]>(this.baseUrl);

  getSeccionById = (seccionId: string) => this.http.get<Seccion>(`${this.baseUrl}/${seccionId}`);

  deleteSeccion = (seccionId: string) => this.http.delete(`${this.baseUrl}/${seccionId}`);


}
