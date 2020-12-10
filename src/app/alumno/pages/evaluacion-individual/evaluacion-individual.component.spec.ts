import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionIndividualComponent } from './evaluacion-individual.component';

describe('EvaluacionIndividualComponent', () => {
  let component: EvaluacionIndividualComponent;
  let fixture: ComponentFixture<EvaluacionIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
