import { TestBed } from '@angular/core/testing';

import { PruebaOnlineService } from './prueba-online.service';

describe('PruebaOnlineService', () => {
  let service: PruebaOnlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PruebaOnlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
