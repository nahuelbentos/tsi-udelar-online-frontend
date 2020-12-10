import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlumnoPruebaOnline } from '../models/alumno-prueba-online.model';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  baseUrl = `${environment.baseUrl}/alumno`;

  constructor(private http: HttpClient) {}

  inscribirseACurso = (alumnoId: string, cursoId: string) => this.http.post(`${this.baseUrl}/inscribirse-a-curso`, {alumnoId, cursoId});

  // tslint:disable-next-line: max-line-length
  inscribirseAEvaluacion = (alumnoId: string, pruebaOnlineId: string) => this.http.post(`${this.baseUrl}/inscribirse-a-evaluacion`, {alumnoId, pruebaOnlineId});
  
  // tslint:disable-next-line: max-line-length
  estaInscriptoCurso = (alumnoId: string, cursoId: string) => this.http.post<boolean>(`${this.baseUrl}/esta-inscripto-curso`, {alumnoId, cursoId});

  // tslint:disable-next-line: max-line-length
  estaInscriptoEvaluacion = (alumnoId: string, pruebaOnlineId: string) => this.http.post<boolean>(`${this.baseUrl}/esta-inscripto-evaluacion`, {alumnoId, pruebaOnlineId});

  getEvaluaciones = (alumnoId: string) => this.http.get<AlumnoPruebaOnline[]>(`${this.baseUrl}/prueba-online/${alumnoId}`);

  


}
