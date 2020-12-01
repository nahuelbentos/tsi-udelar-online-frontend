import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPruebaonlineComponent } from './gestion-pruebaonline.component';

describe('GestionPruebaonlineComponent', () => {
  let component: GestionPruebaonlineComponent;
  let fixture: ComponentFixture<GestionPruebaonlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPruebaonlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPruebaonlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
