import { TestBed } from '@angular/core/testing';

import { MensajetemaService } from './mensajetema.service';

describe('MensajetemaService', () => {
  let service: MensajetemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajetemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
