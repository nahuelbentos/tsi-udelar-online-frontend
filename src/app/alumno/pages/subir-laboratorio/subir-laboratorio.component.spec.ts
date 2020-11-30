import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirLaboratorioComponent } from './subir-laboratorio.component';

describe('SubirLaboratorioComponent', () => {
  let component: SubirLaboratorioComponent;
  let fixture: ComponentFixture<SubirLaboratorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirLaboratorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
