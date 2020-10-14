import { TestBed } from '@angular/core/testing';

import { AdministradorFacultadService } from './administrador-facultad.service';

describe('AdministradorFacultadService', () => {
  let service: AdministradorFacultadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministradorFacultadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
