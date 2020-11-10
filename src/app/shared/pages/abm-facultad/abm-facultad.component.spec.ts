import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmFacultadComponent } from './abm-facultad.component';

describe('AbmFacultadComponent', () => {
  let component: AbmFacultadComponent;
  let fixture: ComponentFixture<AbmFacultadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmFacultadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmFacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
