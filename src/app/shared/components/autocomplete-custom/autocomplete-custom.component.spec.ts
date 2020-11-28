import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteCustomComponent } from './autocomplete-custom.component';

describe('AutocompleteCustomComponent', () => {
  let component: AutocompleteCustomComponent;
  let fixture: ComponentFixture<AutocompleteCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
