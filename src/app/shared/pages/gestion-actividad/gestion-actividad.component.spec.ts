import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionActividadComponent } from './gestion-actividad.component';

describe('GestionActividadComponent', () => {
  let component: GestionActividadComponent;
  let fixture: ComponentFixture<GestionActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionActividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
