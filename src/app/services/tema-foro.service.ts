import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MensajeTema } from '../models/mensajeTema';
import { TemaForo } from '../models/tema-foro.model';

@Injectable({
  providedIn: 'root',
})
export class TemaForoService {
  baseUrl = `${environment.baseUrl}/temaforo`;
  constructor(private http: HttpClient) {}
 
  createTemaForo = (temaforo: TemaForo) => this.http.post(this.baseUrl, temaforo);

  bloquearMensaje = (mensajeTema: MensajeTema) => this.http.post(`${this.baseUrl}/bloquear/${mensajeTema.mensajeId}`, mensajeTema);

  getTemasForo() {
    return this.http.get<TemaForo[]>(`${environment.baseUrl}/temaforo`);
  }

  getTemaForoById(temaForoId: string) {
    return this.http.get<TemaForo>(
      `${environment.baseUrl}/temaforo/${temaForoId}`
    );
  }

  updateTemaForo(temaForo: TemaForo) {
    return this.http.put(`${environment.baseUrl}/temaforo/`, temaForo);
  }

  deleteTemaForo(temaForoId: string) {
    return this.http.delete(`${environment.baseUrl}/temaforo/${temaForoId}`);
  }
}
