import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMaterialComponent } from './gestion-material.component';

describe('GestionMaterialComponent', () => {
  let component: GestionMaterialComponent;
  let fixture: ComponentFixture<GestionMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
