import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmTemplatecursoComponent } from './abm-templatecurso.component';

describe('AbmTemplatecursoComponent', () => {
  let component: AbmTemplatecursoComponent;
  let fixture: ComponentFixture<AbmTemplatecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmTemplatecursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmTemplatecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
