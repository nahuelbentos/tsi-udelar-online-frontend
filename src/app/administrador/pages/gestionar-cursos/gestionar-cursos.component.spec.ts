import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCursosComponent } from './gestionar-cursos.component';

describe('GestionarCursosComponent', () => {
  let component: GestionarCursosComponent;
  let fixture: ComponentFixture<GestionarCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarCursosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
