import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAlumnocursoComponent } from './gestion-alumnocurso.component';

describe('GestionAlumnocursoComponent', () => {
  let component: GestionAlumnocursoComponent;
  let fixture: ComponentFixture<GestionAlumnocursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionAlumnocursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAlumnocursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
