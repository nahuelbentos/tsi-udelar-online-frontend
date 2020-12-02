import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmCursoseccionComponent } from './abm-cursoseccion.component';

describe('AbmCursoseccionComponent', () => {
  let component: AbmCursoseccionComponent;
  let fixture: ComponentFixture<AbmCursoseccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmCursoseccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmCursoseccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
