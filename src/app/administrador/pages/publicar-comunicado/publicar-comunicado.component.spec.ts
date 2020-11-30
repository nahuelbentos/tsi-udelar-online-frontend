import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarComunicadoComponent } from './publicar-comunicado.component';

describe('PublicarComunicadoComponent', () => {
  let component: PublicarComunicadoComponent;
  let fixture: ComponentFixture<PublicarComunicadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicarComunicadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarComunicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
