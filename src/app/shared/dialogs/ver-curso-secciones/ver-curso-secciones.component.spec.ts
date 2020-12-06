import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCursoSeccionesComponent } from './ver-curso-secciones.component';

describe('VerCursoSeccionesComponent', () => {
  let component: VerCursoSeccionesComponent;
  let fixture: ComponentFixture<VerCursoSeccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerCursoSeccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCursoSeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
