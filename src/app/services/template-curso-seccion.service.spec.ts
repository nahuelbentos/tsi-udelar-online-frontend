import { TestBed } from '@angular/core/testing';

import { TemplateCursoSeccionService } from './template-curso-seccion.service';

describe('TemplateCursoSeccionService', () => {
  let service: TemplateCursoSeccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateCursoSeccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
