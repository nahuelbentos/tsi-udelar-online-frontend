import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Facultad } from '../models/facultad.model';

@Injectable({
  providedIn: 'root',
})
export class FacultadService {
  baseUrl = `${environment.baseUrl}/facultad`;
  constructor(private http: HttpClient) {}

  getFacultades(): Observable<Facultad[]> {
    return this.http.get<Facultad[]>(this.baseUrl);
  }
}
