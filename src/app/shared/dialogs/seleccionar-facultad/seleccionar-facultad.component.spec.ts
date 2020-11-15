import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarFacultadComponent } from './seleccionar-facultad.component';

describe('SeleccionarFacultadComponent', () => {
  let component: SeleccionarFacultadComponent;
  let fixture: ComponentFixture<SeleccionarFacultadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarFacultadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarFacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
