import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarActividadComponent } from './seleccionar-actividad.component';

describe('SeleccionarActividadComponent', () => {
  let component: SeleccionarActividadComponent;
  let fixture: ComponentFixture<SeleccionarActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarActividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
