import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTemplatecursoComponent } from './gestion-templatecurso.component';

describe('GestionTemplatecursoComponent', () => {
  let component: GestionTemplatecursoComponent;
  let fixture: ComponentFixture<GestionTemplatecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionTemplatecursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionTemplatecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
