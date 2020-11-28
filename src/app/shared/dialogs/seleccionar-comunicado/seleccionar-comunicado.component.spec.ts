import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarComunicadoComponent } from './seleccionar-comunicado.component';

describe('SeleccionarComunicadoComponent', () => {
  let component: SeleccionarComunicadoComponent;
  let fixture: ComponentFixture<SeleccionarComunicadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarComunicadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarComunicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
