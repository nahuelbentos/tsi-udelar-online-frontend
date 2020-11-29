import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarCalificacionesComponent } from './administrar-calificaciones.component';

describe('AdministrarCalificacionesComponent', () => {
  let component: AdministrarCalificacionesComponent;
  let fixture: ComponentFixture<AdministrarCalificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarCalificacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarCalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
