import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAlumnoPruebaonlineComponent } from './gestion-alumno-pruebaonline.component';

describe('GestionAlumnoPruebaonlineComponent', () => {
  let component: GestionAlumnoPruebaonlineComponent;
  let fixture: ComponentFixture<GestionAlumnoPruebaonlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionAlumnoPruebaonlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAlumnoPruebaonlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
