import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarComunicadoCursoComponent } from './publicar-comunicado-curso.component';

describe('PublicarComunicadoCursoComponent', () => {
  let component: PublicarComunicadoCursoComponent;
  let fixture: ComponentFixture<PublicarComunicadoCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicarComunicadoCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarComunicadoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
