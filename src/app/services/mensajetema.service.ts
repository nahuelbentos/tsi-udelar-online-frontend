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

  deleteMensajeTema(mensajeId: string) {
    return this.http.delete(`${this.baseUrl}/${mensajeId}`);
  }

  updateMensajeTema = (mensajeTema: MensajeTema) =>
  this.http.put(`${this.baseUrl}/${mensajeTema.mensajeId}`, mensajeTema)

  getMensajeTemaById = (mensajeId: string) => this.http.get<MensajeTema>(`${this.baseUrl}/${mensajeId}`)
  
  getMensajeTemaByTemaForo = (id: string) => this.http.get<MensajeTema[]>(`${this.baseUrl}/temaforo/${id}`)
}
