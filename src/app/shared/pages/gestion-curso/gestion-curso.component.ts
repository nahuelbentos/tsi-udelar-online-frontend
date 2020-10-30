import { Component, OnInit } from '@angular/core';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';

@Component({
  selector: 'app-gestion-curso',
  templateUrl: './gestion-curso.component.html',
  styleUrls: ['./gestion-curso.component.scss'],
})
export class GestionCursoComponent implements OnInit {
  cursos = [
    {
      CursoId: 'A4E6248A-C19F-4C98-875B-07DCF3E19F50',
      id: 'A4E6248A-C19F-4C98-875B-07DCF3E19F50',
      Descripcion: 'Taller de Net Core del 2020',
      Nombre: 'TSE 2020 - Se la bancosss',
      Modalidad: 2,
      RequiereMatriculacion: true,
      SalaVirtual: 'salaVirtual-TSI.com',
      TemplateCursoId: '9F4CA882-B42F-473B-85E9-BEFD1E818B7F',
    },
    {
      CursoId: 'F7B4C98D-AFB2-4839-AD4E-C78539F8ECE8',
      id: 'F7B4C98D-AFB2-4839-AD4E-C78539F8ECE8',
      Descripcion: 'Curso creado desde el frontend',
      Nombre: 'Curso Angular',
      Modalidad: 1,
      RequiereMatriculacion: true,
      SalaVirtual: '14/6/2020',
      TemplateCursoId: '9F4CA882-B42F-473B-85E9-BEFD1E818B7F',
    },
    {
      id: '2639748C-6762-4064-8D46-EC7BC521FB4B',
      Descripcion: 'Taller de JAVA del 2020',
      Nombre: 'TSE 2020 - Se la banca',
      Modalidad: 2,
      RequiereMatriculacion: false,
      SalaVirtual: 'salaVirtual-TSI.com',
      TemplateCursoId: '9F4CA882-B42F-473B-85E9-BEFD1E818B7F',
    },
  ];

  columnas = ['Nombre', 'Descripcion', 'Modalidad', 'actions'];

  constructor() {}

  ngOnInit(): void {}

  onEliminar(data: EliminarRow) {
    console.log('Estoy en el padre, el datao fue: ', data);
    if (data.elimino) {
      // Llamamos al backend para eliminar el registro.
    }
  }
}
