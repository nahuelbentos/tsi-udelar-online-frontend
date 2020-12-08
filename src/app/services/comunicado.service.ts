import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comunicado } from '../models/Comunicado';
import { ComunicadoCurso } from '../models/comunicado-curso';
import { ComunicadoFacultad } from '../models/comunicado-facultad';

@Injectable({
  providedIn: 'root'
})
export class ComunicadoService {
  baseUrl = `${environment.baseUrl}/comunicado`;

  constructor(private http: HttpClient) {}

  createComunicado(comunicado: Comunicado) {
    return this.http.post(this.baseUrl, comunicado);
  }

  getComunicados() {
    return this.http.get<Comunicado[]>(this.baseUrl);
  }

  deleteComunicado(comunicadoId: string) {
    return this.http.delete(`${this.baseUrl}/${comunicadoId}`);
  }

  updateComunicado = (comunicado: Comunicado) =>
  this.http.put(`${this.baseUrl}/${comunicado.comunicadoId}`, comunicado)

  getComunicadoById = (comunicadoId: string) =>
    this.http.get<Comunicado>(`${this.baseUrl}/${comunicadoId}`)

  publicarComunicadoFacultad(comunicadoFacultad: ComunicadoFacultad) {
    return this.http.post(`${this.baseUrl}/facultad`, comunicadoFacultad);
  }

  publicarComunicadoCurso(comunicadoCurso: ComunicadoCurso) {
    return this.http.post(`${this.baseUrl}/curso`, comunicadoCurso);
  }

  publicarComunicadoGeneral(comunicado: Comunicado) {
    return this.http.post(`${this.baseUrl}/general`, comunicado);
  }

  GetComunicadosByFacultadId(facultadId: string) {
    return this.http.get<Comunicado[]>(`${this.baseUrl}/facultad/${facultadId}`);
  }
}
