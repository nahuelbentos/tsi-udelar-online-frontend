import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarPruebasOnlineComponent } from './seleccionar-pruebas-online.component';

describe('SeleccionarPruebasOnlineComponent', () => {
  let component: SeleccionarPruebasOnlineComponent;
  let fixture: ComponentFixture<SeleccionarPruebasOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarPruebasOnlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarPruebasOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
