import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmTemaforoComponent } from './abm-temaforo.component';

describe('AbmTemaforoComponent', () => {
  let component: AbmTemaforoComponent;
  let fixture: ComponentFixture<AbmTemaforoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmTemaforoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmTemaforoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
