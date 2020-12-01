import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMensajeComponent } from './gestion-mensaje.component';

describe('GestionMensajeComponent', () => {
  let component: GestionMensajeComponent;
  let fixture: ComponentFixture<GestionMensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionMensajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
