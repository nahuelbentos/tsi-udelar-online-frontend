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
}
