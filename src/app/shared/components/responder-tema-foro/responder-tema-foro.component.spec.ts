import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderTemaForoComponent } from './responder-tema-foro.component';

describe('ResponderTemaForoComponent', () => {
  let component: ResponderTemaForoComponent;
  let fixture: ComponentFixture<ResponderTemaForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderTemaForoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderTemaForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
