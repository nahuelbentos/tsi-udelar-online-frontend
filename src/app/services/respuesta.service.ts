import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Respuesta } from '../models/respuesta.model';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  constructor(private http: HttpClient) { }

  createRespuesta(respuesta: Respuesta) {
    return this.http.post(`${environment.baseUrl}/respuesta`, respuesta);
  }

  getRespuestas() {
    return this.http.get<Respuesta[]>(`${environment.baseUrl}/respuesta`);
  }

  deleteRespuesta(respuestaId: string) {
    return this.http.delete(`${environment.baseUrl}/respuesta/${respuestaId}`);
  }

}
