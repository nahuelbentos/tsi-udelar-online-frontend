import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTemplatecursoseccionComponent } from './gestion-templatecursoseccion.component';

describe('GestionTemplatecursoseccionComponent', () => {
  let component: GestionTemplatecursoseccionComponent;
  let fixture: ComponentFixture<GestionTemplatecursoseccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionTemplatecursoseccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionTemplatecursoseccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
