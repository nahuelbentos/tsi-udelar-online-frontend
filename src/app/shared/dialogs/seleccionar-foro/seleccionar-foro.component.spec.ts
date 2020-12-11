import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarForoComponent } from './seleccionar-foro.component';

describe('SeleccionarForoComponent', () => {
  let component: SeleccionarForoComponent;
  let fixture: ComponentFixture<SeleccionarForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarForoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
