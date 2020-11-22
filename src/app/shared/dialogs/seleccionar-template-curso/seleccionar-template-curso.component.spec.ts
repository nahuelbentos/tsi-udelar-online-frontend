import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarTemplateCursoComponent } from './seleccionar-template-curso.component';

describe('SeleccionarTemplateCursoComponent', () => {
  let component: SeleccionarTemplateCursoComponent;
  let fixture: ComponentFixture<SeleccionarTemplateCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarTemplateCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarTemplateCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
