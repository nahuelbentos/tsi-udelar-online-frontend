import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMensajetemaComponent } from './gestion-mensajetema.component';

describe('GestionMensajetemaComponent', () => {
  let component: GestionMensajetemaComponent;
  let fixture: ComponentFixture<GestionMensajetemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionMensajetemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionMensajetemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
