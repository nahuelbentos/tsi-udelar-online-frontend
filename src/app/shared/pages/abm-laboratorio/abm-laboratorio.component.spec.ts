import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmLaboratorioComponent } from './abm-laboratorio.component';

describe('AbmLaboratorioComponent', () => {
  let component: AbmLaboratorioComponent;
  let fixture: ComponentFixture<AbmLaboratorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmLaboratorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
