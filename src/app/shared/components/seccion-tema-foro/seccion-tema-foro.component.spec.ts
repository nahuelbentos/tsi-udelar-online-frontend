import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionTemaForoComponent } from './seccion-tema-foro.component';

describe('SeccionTemaForoComponent', () => {
  let component: SeccionTemaForoComponent;
  let fixture: ComponentFixture<SeccionTemaForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionTemaForoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionTemaForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
