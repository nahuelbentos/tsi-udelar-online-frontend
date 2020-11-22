import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmMensajetemaComponent } from './abm-mensajetema.component';

describe('AbmMensajetemaComponent', () => {
  let component: AbmMensajetemaComponent;
  let fixture: ComponentFixture<AbmMensajetemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmMensajetemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmMensajetemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
