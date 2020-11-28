import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosPublicosComponent } from './cursos-publicos.component';

describe('CursosPublicosComponent', () => {
  let component: CursosPublicosComponent;
  let fixture: ComponentFixture<CursosPublicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosPublicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosPublicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
