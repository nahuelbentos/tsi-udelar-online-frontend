import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarClasesDictadasComponent } from './administrar-clases-dictadas.component';

describe('AdministrarClasesDictadasComponent', () => {
  let component: AdministrarClasesDictadasComponent;
  let fixture: ComponentFixture<AdministrarClasesDictadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarClasesDictadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarClasesDictadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
