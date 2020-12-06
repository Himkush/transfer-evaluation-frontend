import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { DataService } from 'src/app/components/services/data_service.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  isFileUploaded = false;
  isNewImport = false;
  showSpinner = false;

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
    this.dataService.check_data_existence().subscribe(res => {
      if (res.error) {
        this.isNewImport = true;
      } else{
        this.isNewImport = false;
      }
    })
  }
  onFileSelect(event) {
    const af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (!_.includes(af, file.type)) {
        alert('Only EXCEL Docs Allowed!');
      } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm.get('myfile').setValue(file);
      }
    }
  }
  onFormSubmit() {

    if (!this.fileUploadForm.get('myfile').value) {
      alert('Please fill valid details!');
      this.isFileUploaded = false;
      return false;
    }
    this.isFileUploaded = true;
    const formData = new FormData();
    formData.append('file', this.fileUploadForm.get('myfile').value);
    this.showSpinner = true;
    if (this.isNewImport) {
      this.dataService.upload_excel_data(formData).subscribe(res => {
        this.showSpinner = false;
        this.toastr.success('File Uploaded Successfully');
        this.uploadFileInput.nativeElement.value = '';
        this.fileInputLabel = undefined;
      }, err => {
        this.showSpinner = false;
        this.toastr.error('Some Error Occurred File not uploaded!', 'Try Again');
      });
    } else {
      this.dataService.append_more_excel_Data(formData).subscribe(res => {
        this.showSpinner = false;
        this.isNewImport = false;
        this.toastr.success('File Uploaded Successfully');
        this.uploadFileInput.nativeElement.value = '';
        this.fileInputLabel = undefined;
      }, err => {
        this.showSpinner = false;
        this.toastr.error('Some Error Occurred File not uploaded!', 'Try Again');
      });
    }

  }

}
