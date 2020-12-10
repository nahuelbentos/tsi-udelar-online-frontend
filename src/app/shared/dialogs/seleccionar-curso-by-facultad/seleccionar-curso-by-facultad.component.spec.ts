import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarCursoByFacultadComponent } from './seleccionar-curso-by-facultad.component';

describe('SeleccionarCursoByFacultadComponent', () => {
  let component: SeleccionarCursoByFacultadComponent;
  let fixture: ComponentFixture<SeleccionarCursoByFacultadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarCursoByFacultadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarCursoByFacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
