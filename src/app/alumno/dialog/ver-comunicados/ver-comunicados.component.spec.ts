import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerComunicadosComponent } from './ver-comunicados.component';

describe('VerComunicadosComponent', () => {
  let component: VerComunicadosComponent;
  let fixture: ComponentFixture<VerComunicadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerComunicadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerComunicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
