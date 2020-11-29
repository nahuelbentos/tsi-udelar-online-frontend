import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TemaForo } from '../models/tema-foro.model';

@Injectable({
  providedIn: 'root'
})
export class TemaForoService {
  constructor(private http: HttpClient) { }

  createTemaForo(temaforo: TemaForo) {
    return this.http.post(`${environment.baseUrl}/temaforo`, temaforo);
  }

  getTemasForo() {
    return this.http.get<TemaForo[]>(`${environment.baseUrl}/temaforo`);
  }

  getTemaForoById(temaForoId: string) {
    return this.http.get<TemaForo>(`${environment.baseUrl}/temaforo/${temaForoId}`);
  }
  
  updateTemaForo(temaForo: TemaForo) {
    return this.http.put(`${environment.baseUrl}/temaforo/`,temaForo);
  }

  deleteTemaForo(temaForoId: string) {
    return this.http.delete(`${environment.baseUrl}/temaforo/${temaForoId}`);
  }

}
