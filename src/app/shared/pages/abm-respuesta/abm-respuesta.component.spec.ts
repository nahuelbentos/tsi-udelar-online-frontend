import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmRespuestaComponent } from './abm-respuesta.component';

describe('AbmRespuestaComponent', () => {
  let component: AbmRespuestaComponent;
  let fixture: ComponentFixture<AbmRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmRespuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
