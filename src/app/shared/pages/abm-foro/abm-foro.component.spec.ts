import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmForoComponent } from './abm-foro.component';

describe('AbmForoComponent', () => {
  let component: AbmForoComponent;
  let fixture: ComponentFixture<AbmForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmForoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
