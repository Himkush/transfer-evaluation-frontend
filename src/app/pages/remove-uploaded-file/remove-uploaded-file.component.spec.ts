import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveUploadedFileComponent } from './remove-uploaded-file.component';

describe('RemoveUploadedFileComponent', () => {
  let component: RemoveUploadedFileComponent;
  let fixture: ComponentFixture<RemoveUploadedFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveUploadedFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveUploadedFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
