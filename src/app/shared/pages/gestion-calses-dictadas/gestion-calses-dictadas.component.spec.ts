import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCalsesDictadasComponent } from './gestion-calses-dictadas.component';

describe('GestionCalsesDictadasComponent', () => {
  let component: GestionCalsesDictadasComponent;
  let fixture: ComponentFixture<GestionCalsesDictadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCalsesDictadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCalsesDictadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
