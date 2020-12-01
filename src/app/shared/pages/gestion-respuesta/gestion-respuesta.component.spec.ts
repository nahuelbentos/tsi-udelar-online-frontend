import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRespuestaComponent } from './gestion-respuesta.component';

describe('GestionRespuestaComponent', () => {
  let component: GestionRespuestaComponent;
  let fixture: ComponentFixture<GestionRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionRespuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
