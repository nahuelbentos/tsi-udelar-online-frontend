import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TemaForo } from '../models/temaforo.model';

@Injectable({
  providedIn: 'root'
})
export class TemaForoService {
  constructor(private http: HttpClient) { }

  createTemaForo(temaforo: TemaForo) {
    return this.http.post(`${environment.baseUrl}/temaforo`, temaforo);
  }
}
