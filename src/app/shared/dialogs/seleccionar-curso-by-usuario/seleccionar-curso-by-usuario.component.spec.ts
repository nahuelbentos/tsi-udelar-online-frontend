import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarCursoByUsuarioComponent } from './seleccionar-curso-by-usuario.component';

describe('SeleccionarCursoByUsuarioComponent', () => {
  let component: SeleccionarCursoByUsuarioComponent;
  let fixture: ComponentFixture<SeleccionarCursoByUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarCursoByUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarCursoByUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
