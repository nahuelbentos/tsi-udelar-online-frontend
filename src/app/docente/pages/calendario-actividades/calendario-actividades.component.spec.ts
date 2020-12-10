import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioActividadesComponent } from './calendario-actividades.component';

describe('CalendarioActividadesComponent', () => {
  let component: CalendarioActividadesComponent;
  let fixture: ComponentFixture<CalendarioActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioActividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
