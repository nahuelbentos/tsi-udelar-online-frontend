import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmAlumnocursoComponent } from './abm-alumnocurso.component';

describe('AbmAlumnocursoComponent', () => {
  let component: AbmAlumnocursoComponent;
  let fixture: ComponentFixture<AbmAlumnocursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmAlumnocursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmAlumnocursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
