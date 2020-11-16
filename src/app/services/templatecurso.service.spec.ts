import { TestBed } from '@angular/core/testing';

import { TemplatecursoService } from './templatecurso.service';

describe('TemplatecursoService', () => {
  let service: TemplatecursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplatecursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
