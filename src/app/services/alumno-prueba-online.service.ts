import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlumnoPruebaOnline } from '../models/alumno-prueba-online.model';

@Injectable({
  providedIn: 'root',
})
export class AlumnoPruebaOnlineService {
  baseUrl = `${environment.baseUrl}/alumnopruebaonline`;

  constructor(private http: HttpClient) {}

  createAlumnoPruebaOnline = (alumnoPruebaOnline: AlumnoPruebaOnline) => this.http.post(this.baseUrl, alumnoPruebaOnline);

  updateAlumnoPruebaOnline = (alumnoPruebaOnline: AlumnoPruebaOnline) => this.http.put(`${this.baseUrl}/${alumnoPruebaOnline.alumnoId}/${alumnoPruebaOnline.pruebaOnlineId}`, alumnoPruebaOnline);

  getAlumnoPruebaOnline = () => this.http.get<AlumnoPruebaOnline[]>(this.baseUrl);

  getAlumnoPruebaOnlineById = (alumnoId: string, pruebaOnlineId: string) => this.http.get<AlumnoPruebaOnline>(`${this.baseUrl}/${alumnoId}/${pruebaOnlineId}`);

  getAlumnoPruebaOnlineByAlumno = (alumnoId: string) => this.http.get<AlumnoPruebaOnline>(`${this.baseUrl}/byalumno/${alumnoId}`);

  getAlumnoPruebaOnlineByPrueba = (pruebaOnlineId: string) => this.http.get<AlumnoPruebaOnline>(`${this.baseUrl}/byprueba/${pruebaOnlineId}`);

  
}
