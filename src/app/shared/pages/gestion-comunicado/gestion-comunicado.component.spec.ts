import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionComunicadoComponent } from './gestion-comunicado.component';

describe('GestionComunicadoComponent', () => {
  let component: GestionComunicadoComponent;
  let fixture: ComponentFixture<GestionComunicadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionComunicadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionComunicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
