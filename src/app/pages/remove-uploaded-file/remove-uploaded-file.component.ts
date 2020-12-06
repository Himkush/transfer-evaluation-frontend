import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/components/services/data_service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remove-uploaded-file',
  templateUrl: './remove-uploaded-file.component.html',
  styleUrls: ['./remove-uploaded-file.component.css']
})
export class RemoveUploadedFileComponent implements OnInit {

  constructor(private dataService: DataService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  removeUploadedFile() {
    if (confirm('Are you sure you want to delete all data. Once deleted it will not be restored')) {
      this.dataService.remove_uploaded_data().subscribe(res => {
        this.toastr.success('Deleted Successfully');
      }, err => {
        this.toastr.error('Not Deleted some error occurred', 'Try Again');
      });
    }
  }
}
