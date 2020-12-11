import { TestBed } from '@angular/core/testing';

import { AlumnoPruebaOnlineService } from './alumno-prueba-online.service';

describe('AlumnoPruebaOnlineService', () => {
  let service: AlumnoPruebaOnlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnoPruebaOnlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
