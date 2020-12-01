import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaCursoComponent } from './vista-curso.component';

describe('VistaCursoComponent', () => {
  let component: VistaCursoComponent;
  let fixture: ComponentFixture<VistaCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
