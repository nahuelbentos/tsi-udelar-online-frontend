import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarMaterialesComponent } from './administrar-materiales.component';

describe('AdministrarMaterialesComponent', () => {
  let component: AdministrarMaterialesComponent;
  let fixture: ComponentFixture<AdministrarMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarMaterialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
