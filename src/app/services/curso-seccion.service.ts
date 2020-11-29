import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CursoSeccion } from '../models/curso-seccion';

@Injectable({
  providedIn: 'root'
})
export class CursoSeccionService {
  baseUrl = `${environment.baseUrl}/comunicado`;

  constructor(private http: HttpClient) {}

  altaCursoSeccion(cursoSeccion: CursoSeccion) {
    return this.http.post(this.baseUrl, cursoSeccion);
  }
}
