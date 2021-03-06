import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Facultad } from '../models/facultad.model';

@Injectable({
  providedIn: 'root',
})
export class FacultadService {
  baseUrl = `${environment.baseUrl}/facultad`;
  constructor(private http: HttpClient) {}

  createFacultad(facultad: Facultad) {
    return this.http.post(this.baseUrl, facultad);
  }

  updateFacultad = (facultad: Facultad) => this.http.put(`${this.baseUrl}/${facultad.facultadId}`, facultad);

  getFacultades() {
    return this.http.get<Facultad[]>(this.baseUrl);
  }

  deleteFacultad(facultadId: string) {
    return this.http.delete(`${this.baseUrl}/${facultadId}`);
  }

  getFacultadById = (facultadId: string) => this.http.get<Facultad>(`${this.baseUrl}/${facultadId}`);
}
