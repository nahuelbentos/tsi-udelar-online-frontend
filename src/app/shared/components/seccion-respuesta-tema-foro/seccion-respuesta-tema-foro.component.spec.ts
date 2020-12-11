import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionRespuestaTemaForoComponent } from './seccion-respuesta-tema-foro.component';

describe('SeccionRespuestaTemaForoComponent', () => {
  let component: SeccionRespuestaTemaForoComponent;
  let fixture: ComponentFixture<SeccionRespuestaTemaForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionRespuestaTemaForoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionRespuestaTemaForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
