import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCursoseccionComponent } from './gestion-cursoseccion.component';

describe('GestionCursoseccionComponent', () => {
  let component: GestionCursoseccionComponent;
  let fixture: ComponentFixture<GestionCursoseccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCursoseccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCursoseccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
