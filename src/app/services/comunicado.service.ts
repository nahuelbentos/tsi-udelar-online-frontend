import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comunicado } from '../models/Comunicado';

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
}
