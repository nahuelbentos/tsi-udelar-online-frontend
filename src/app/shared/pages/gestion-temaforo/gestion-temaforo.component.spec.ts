import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTemaforoComponent } from './gestion-temaforo.component';

describe('GestionTemaforoComponent', () => {
  let component: GestionTemaforoComponent;
  let fixture: ComponentFixture<GestionTemaforoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionTemaforoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionTemaforoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
