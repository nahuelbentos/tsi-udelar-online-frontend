import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCarreraComponent } from './gestion-carrera.component';

describe('GestionCarreraComponent', () => {
  let component: GestionCarreraComponent;
  let fixture: ComponentFixture<GestionCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCarreraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
