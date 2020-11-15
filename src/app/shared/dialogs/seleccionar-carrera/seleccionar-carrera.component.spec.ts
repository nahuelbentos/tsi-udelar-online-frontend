import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarCarreraComponent } from './seleccionar-carrera.component';

describe('SeleccionarCarreraComponent', () => {
  let component: SeleccionarCarreraComponent;
  let fixture: ComponentFixture<SeleccionarCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarCarreraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
