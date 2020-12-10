import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaCursoComponent } from './grafica-curso.component';

describe('GraficaCursoComponent', () => {
  let component: GraficaCursoComponent;
  let fixture: ComponentFixture<GraficaCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
