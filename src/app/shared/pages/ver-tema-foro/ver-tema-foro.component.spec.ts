import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTemaForoComponent } from './ver-tema-foro.component';

describe('VerTemaForoComponent', () => {
  let component: VerTemaForoComponent;
  let fixture: ComponentFixture<VerTemaForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerTemaForoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTemaForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
