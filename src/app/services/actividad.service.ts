import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Actividad } from '../models/actividad.model';


@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  baseUrl = `${environment.baseUrl}/actividad`;
  constructor(private http: HttpClient) {}

  createActividad = (actividad: Actividad)  => this.http.post(this.baseUrl, actividad);

  updateActividad = (actividad: Actividad)  => this.http.put(`${this.baseUrl}/${actividad.actividadId}`, actividad);

  getActividades = () => this.http.get<Actividad[]>(this.baseUrl);

  getActividadById = (actividadId: string) => this.http.get<Actividad>(`${this.baseUrl}/${actividadId}`);

  deleteActividad = (actividadId: string)  => this.http.delete(`${this.baseUrl}/${actividadId}`);
}
