import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionForoComponent } from './gestion-foro.component';

describe('GestionForoComponent', () => {
  let component: GestionForoComponent;
  let fixture: ComponentFixture<GestionForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionForoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
