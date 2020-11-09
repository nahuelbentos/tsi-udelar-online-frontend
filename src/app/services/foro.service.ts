import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Foro } from '../models/foro.model';

@Injectable({
  providedIn: 'root',
})
export class ForoService {

  baseUrl = `${environment.baseUrl}/foro`;

  constructor(private http: HttpClient) {}

  createForo = (foro: Foro) => this.http.post(this.baseUrl, foro);

  updateForo = (foro: Foro) => this.http.put(`${this.baseUrl}/${foro.foroId}`, foro);

  getForos = () => this.http.get<Foro[]>(this.baseUrl);

  getForoById = (foroId: string) => this.http.get<Foro>(`${this.baseUrl}/${foroId}`);

  deleteForo = (foroId: string) => this.http.delete(`${this.baseUrl}/${foroId}`);
}
