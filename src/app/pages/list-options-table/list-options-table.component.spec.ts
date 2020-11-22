import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOptionsTableComponent } from './list-options-table.component';

describe('ListOptionsTableComponent', () => {
  let component: ListOptionsTableComponent;
  let fixture: ComponentFixture<ListOptionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOptionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOptionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
