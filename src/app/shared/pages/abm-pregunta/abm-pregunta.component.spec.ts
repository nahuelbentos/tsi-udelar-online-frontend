import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmPreguntaComponent } from './abm-pregunta.component';

describe('AbmPreguntaComponent', () => {
  let component: AbmPreguntaComponent;
  let fixture: ComponentFixture<AbmPreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmPreguntaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
