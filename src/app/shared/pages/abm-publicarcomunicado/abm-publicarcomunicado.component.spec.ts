import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmPublicarcomunicadoComponent } from './abm-publicarcomunicado.component';

describe('AbmPublicarcomunicadoComponent', () => {
  let component: AbmPublicarcomunicadoComponent;
  let fixture: ComponentFixture<AbmPublicarcomunicadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmPublicarcomunicadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmPublicarcomunicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
