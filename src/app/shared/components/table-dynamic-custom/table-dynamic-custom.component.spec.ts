import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDynamicCustomComponent } from './table-dynamic-custom.component';

describe('TableDynamicCustomComponent', () => {
  let component: TableDynamicCustomComponent;
  let fixture: ComponentFixture<TableDynamicCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDynamicCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDynamicCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
