import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmSeccionComponent } from '../abm-seccion/abm-seccion.component';

describe('AbmSeccionComponent', () => {
  let component: AbmSeccionComponent;
  let fixture: ComponentFixture<AbmSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmSeccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
