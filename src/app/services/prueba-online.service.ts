import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PruebaOnline } from '../models/prueba-online.model';

@Injectable({
  providedIn: 'root'
})
export class PruebaOnlineService {

  baseUrl = `${environment.baseUrl}/actividad/pruebaonline/`;

  constructor(private http: HttpClient) { }

  createPruebaOnline = (pruebaOnline: PruebaOnline) => this.http.post(this.baseUrl, pruebaOnline);

  updatePruebaOnline = (pruebaOnline: PruebaOnline) => this.http.put(`${this.baseUrl}/${pruebaOnline.pruebaOnlineId}`, pruebaOnline);

  getPruebasOnline = () => this.http.get<PruebaOnline[]>(this.baseUrl);

  getPruebaOnlineById = (pruebaOnlineId: string) => this.http.get<PruebaOnline>(`${this.baseUrl}/${pruebaOnlineId}`);

  deletePruebaOnline = (pruebaOnlineId: string) => this.http.delete(`${this.baseUrl}/${pruebaOnlineId}`);
}
