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

  createActividad(actividad: Actividad) {
    return this.http.post(this.baseUrl, actividad);
  }

  getActividades() {
    return this.http.get<Actividad[]>(this.baseUrl);
  }

  deleteActividad(actividadId: string) {
    return this.http.delete(`${this.baseUrl}/${actividadId}`);
  }
}
