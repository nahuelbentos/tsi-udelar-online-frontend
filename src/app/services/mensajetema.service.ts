import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MensajeTema } from '../models/mensajeTema';

@Injectable({
  providedIn: 'root'
})
export class MensajetemaService {
  baseUrl = `${environment.baseUrl}/mensajetema`;

  constructor(private http: HttpClient) {}

  createMensajeTema(mensajeTema: MensajeTema) {
    return this.http.post(this.baseUrl, mensajeTema);
  }

  getMensajesTema() {
    return this.http.get<MensajeTema[]>(this.baseUrl);
  }

  deleteMensajeTema(mensajeTemaId: string) {
    return this.http.delete(`${this.baseUrl}/${mensajeTemaId}`);
  }

  updateMensajeTema = (mensajeTema: MensajeTema) =>
  this.http.put(`${this.baseUrl}/${mensajeTema.mensajeTemaId}`, mensajeTema)

  getMensajeTemaById = (mensajeTemaId: string) =>
    this.http.get<MensajeTema>(`${this.baseUrl}/${mensajeTemaId}`)
}
