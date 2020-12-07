import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarFacultadComponent } from './administrar-facultad.component';

describe('AdministrarFacultadComponent', () => {
  let component: AdministrarFacultadComponent;
  let fixture: ComponentFixture<AdministrarFacultadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarFacultadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarFacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
