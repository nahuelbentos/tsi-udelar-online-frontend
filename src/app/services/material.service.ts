import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Material } from '../models/material.model';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {

  baseUrl = `${environment.baseUrl}/material`;

  constructor(private http: HttpClient) {}

  createMaterial = (material: Material) => this.http.post(this.baseUrl, material);

  updateMaterial = (material: Material) => this.http.put(`${this.baseUrl}/${material.materialId}`, material);

  getMateriales = () => this.http.get<Material[]>(this.baseUrl);

  getMaterialById = (materialId: string) => this.http.get<Material>(`${this.baseUrl}/${materialId}`);

  deleteMaterial = (materialId: string) => this.http.delete(`${this.baseUrl}/${materialId}`);

}
