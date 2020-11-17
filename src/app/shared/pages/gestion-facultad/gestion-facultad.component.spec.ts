import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFacultadComponent } from './gestion-facultad.component';

describe('GestionFacultadComponent', () => {
  let component: GestionFacultadComponent;
  let fixture: ComponentFixture<GestionFacultadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionFacultadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionFacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
