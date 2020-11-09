import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmEncuestaComponent } from './abm-encuesta.component';

describe('AbmEncuestaComponent', () => {
  let component: AbmEncuestaComponent;
  let fixture: ComponentFixture<AbmEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmEncuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
