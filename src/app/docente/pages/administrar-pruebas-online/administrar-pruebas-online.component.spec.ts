import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarPruebasOnlineComponent } from './administrar-pruebas-online.component';

describe('AdministrarPruebasOnlineComponent', () => {
  let component: AdministrarPruebasOnlineComponent;
  let fixture: ComponentFixture<AdministrarPruebasOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarPruebasOnlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarPruebasOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
