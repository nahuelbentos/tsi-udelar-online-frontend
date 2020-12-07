import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarTrabajoComponent } from './seleccionar-trabajo.component';

describe('SeleccionarTrabajoComponent', () => {
  let component: SeleccionarTrabajoComponent;
  let fixture: ComponentFixture<SeleccionarTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarTrabajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
