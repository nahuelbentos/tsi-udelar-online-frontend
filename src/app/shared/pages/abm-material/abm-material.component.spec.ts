import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmMaterialComponent } from './abm-material.component';

describe('AbmMaterialComponent', () => {
  let component: AbmMaterialComponent;
  let fixture: ComponentFixture<AbmMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
