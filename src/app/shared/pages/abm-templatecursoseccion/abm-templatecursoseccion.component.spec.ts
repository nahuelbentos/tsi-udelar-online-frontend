import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmTemplatecursoseccionComponent } from './abm-templatecursoseccion.component';

describe('AbmTemplatecursoseccionComponent', () => {
  let component: AbmTemplatecursoseccionComponent;
  let fixture: ComponentFixture<AbmTemplatecursoseccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmTemplatecursoseccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmTemplatecursoseccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
