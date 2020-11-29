import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmPruebaonlineComponent } from './abm-pruebaonline.component';

describe('AbmPruebaonlineComponent', () => {
  let component: AbmPruebaonlineComponent;
  let fixture: ComponentFixture<AbmPruebaonlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmPruebaonlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmPruebaonlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
