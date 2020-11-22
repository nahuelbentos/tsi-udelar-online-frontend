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

  deleteTemaForo(temaForoId: string) {
    return this.http.delete(`${environment.baseUrl}/temaforo/${temaForoId}`);
  }

}
