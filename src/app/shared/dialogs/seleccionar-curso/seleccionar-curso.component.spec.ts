import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarCursoComponent } from './seleccionar-curso.component';

describe('SeleccionarCursoComponent', () => {
  let component: SeleccionarCursoComponent;
  let fixture: ComponentFixture<SeleccionarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
