import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CursoSeccion } from '../models/curso-seccion';
import { Material } from '../models/material.model';

@Injectable({
  providedIn: 'root'
})
export class CursoSeccionService {
  baseUrl = `${environment.baseUrl}/curso-seccion`;

  constructor(private http: HttpClient) {}

  // altaMaterialCursoSeccion(material: Material) {
  //   return this.http.post(this.baseUrl, material);
  // }
}
