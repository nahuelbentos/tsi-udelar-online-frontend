import { TestBed } from '@angular/core/testing';

import { TemaForoService } from './tema-foro.service';

describe('TemaForoService', () => {
  let service: TemaForoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemaForoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
