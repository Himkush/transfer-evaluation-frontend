import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewOptionsComponent } from './add-new-options.component';

describe('AddNewOptionsComponent', () => {
  let component: AddNewOptionsComponent;
  let fixture: ComponentFixture<AddNewOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
