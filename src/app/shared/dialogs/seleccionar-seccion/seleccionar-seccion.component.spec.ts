import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarSeccionComponent } from './seleccionar-seccion.component';

describe('SeleccionarSeccionComponent', () => {
  let component: SeleccionarSeccionComponent;
  let fixture: ComponentFixture<SeleccionarSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarSeccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
