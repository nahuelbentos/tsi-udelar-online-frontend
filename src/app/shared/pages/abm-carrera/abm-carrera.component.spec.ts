import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmCarreraComponent } from './abm-carrera.component';

describe('AbmCarreraComponent', () => {
  let component: AbmCarreraComponent;
  let fixture: ComponentFixture<AbmCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmCarreraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
