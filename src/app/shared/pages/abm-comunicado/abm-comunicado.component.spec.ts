import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmComunicadoComponent } from './abm-comunicado.component';

describe('AbmComunicadoComponent', () => {
  let component: AbmComunicadoComponent;
  let fixture: ComponentFixture<AbmComunicadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmComunicadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmComunicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
