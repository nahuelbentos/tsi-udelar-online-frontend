import { TestBed } from '@angular/core/testing';

import { CursoSeccionService } from './curso-seccion.service';

describe('CursoSeccionService', () => {
  let service: CursoSeccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursoSeccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
