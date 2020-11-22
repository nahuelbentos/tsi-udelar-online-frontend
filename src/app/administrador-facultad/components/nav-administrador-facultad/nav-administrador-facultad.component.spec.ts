import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAdministradorFacultadComponent } from './nav-administrador-facultad.component';

describe('NavAdministradorFacultadComponent', () => {
  let component: NavAdministradorFacultadComponent;
  let fixture: ComponentFixture<NavAdministradorFacultadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavAdministradorFacultadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAdministradorFacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
