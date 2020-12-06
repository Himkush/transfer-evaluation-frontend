import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DataService } from './../../components/services/data_service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-options',
  templateUrl: './add-new-options.component.html',
  styleUrls: ['./add-new-options.component.css']
})
export class AddNewOptionsComponent implements OnInit {

  show_major = false;
  show_school = false;
  show_approver = false;
  is_update = false;
  update_approver = false;
  update_majors = false;
  update_schools = false;
  update_majorReq = false;
  update_transferCourse = false;

  major_name = new FormControl(null, [Validators.required, Validators.maxLength(30)]);
  school_name = new FormControl(null, [Validators.required, Validators.maxLength(30)]);
  approver_name = new FormControl(null, [Validators.required, Validators.maxLength(20)]);

  updated_majorField = new FormControl(null, Validators.required);
  updated_schoolGroup: FormGroup;
  updated_approverField = new FormControl(null, Validators.required);
  updated_majorReqGroup: FormGroup;
  updated_transferCourseGroup: FormGroup;

  constructor(private dataService: DataService,
              private toastr: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
                this.activatedRoute.queryParams.subscribe(params => {
                      this.show_major = params['major'] === 'true';
                      this.show_school = params['school'] === 'true';
                      this.show_approver = params['approver'] === 'true';
                      this.is_update = params['update'] === 'true';
                      this.update_approver = params['approvers'] === 'true';
                      this.update_majors = params['majors'] === 'true';
                      this.update_schools = params['schools'] === 'true';
                      this.update_majorReq = params['majorReqs'] === 'true';
                      this.update_transferCourse = params['transferCourses'] === 'true';
                  });
               }

  ngOnInit(): void {
    if (!(this.show_major || this.show_approver || this.show_school || this.is_update)) {
      this.router.navigateByUrl('/addTables');
    } else if (!(this.dataService.approversData || this .dataService.majorData
       || this.dataService.majorReqData || this.dataService.schoolData || this.dataService.approversData
       || this.show_major || this.show_approver || this.show_school || this.is_update)) {
      this.router.navigateByUrl('/list-table-options');
    }
    if (this.update_majors) {
      this.updated_majorField.setValue(this.dataService.majorData.major_name);
    } else if (this.update_schools) {
      this.updated_schoolGroup = new FormGroup({
        'school_name': new FormControl(this.dataService.schoolData.school_name, Validators.required),
        'state_name': new FormControl(this.dataService.schoolData.state_name, Validators.required)
      });
    } else if (this.update_approver) {
      this.updated_approverField.setValue(this.dataService.approversData.approver_name);
    } else if (this.update_majorReq) {
      this.updated_majorReqGroup = new FormGroup({
        'description': new FormControl(this.dataService.majorReqData.description, Validators.required),
        'major_id': new FormControl(this.dataService.majorReqData.major_id, Validators.required)
      });
    } else if(this.update_transferCourse) {
      this.updated_transferCourseGroup = new FormGroup({
        'subject_number': new FormControl(this.dataService.transferCourseData.subject_number, Validators.required),
        'title': new FormControl(this.dataService.transferCourseData.title, Validators.required),
        'school_id': new FormControl(this.dataService.transferCourseData.school_id, Validators.required)
      });
    }
  }
  add_major() {
    if (this.major_name.valid && this.major_name.value){
      this.dataService.post_major_data({'major_name': this.major_name.value})
        .subscribe(res => {
          this.toastr.success('Successfully Added!');
          this.router.navigateByUrl('/addTables');
        },
          err => {
            this.toastr.error('Some Error Occurred', 'Not added Successfully');
          });
    }
  }
  add_school() {
    if (this.school_name.valid && this.school_name.value) {
      this.dataService.post_school_data({'school_name': this.school_name.value})
        .subscribe(res => {
          this.toastr.success('Successfully Added!');
          this.router.navigateByUrl('/addTables');
        },
          err => {
            this.toastr.error('Some Error Occurred', 'Not added Successfully');
          });
    }
  }
  add_approvers() {
    if (this.approver_name.valid && this.approver_name.value) {
      this.dataService.post_approver_data({'approver_name': this.approver_name.value})
        .subscribe(res => {
          this.toastr.success('Successfully Added!');
          this.router.navigateByUrl('/addTables');
        },
          err => {
            this.toastr.error('Some Error Occurred', 'Not added Successfully');
          });
    }
  }
  add_transfer_title() {
  }
  onUpdateApprover() {
    let id = this.dataService.approversData.approver_id;
    if (this.updated_approverField.valid) {
      this.dataService.update_approvers_data(id, {
        approver_id: id,
        approver_name: this.updated_approverField.value
      }).subscribe(res => {
        this.toastr.success('Updated Successfully!');
        this.router.navigate(['list-table-options'], {queryParams: {'table': 'approvers'}});
      }, err => {
        this.toastr.error('Some Error Occurred!');
      })
    } else {
      this.toastr.error('Check all the fields are correct');
    }

  }
  onUpdateMajor() {
    let id = this.dataService.majorData.major_id;
    if (this.updated_majorField.valid) {
      this.dataService.update_major_data(id, {
        major_id: id,
        major_name: this.updated_majorField.value
      }).subscribe(res => {
        this.toastr.success('Updated Successfully!');
        this.router.navigate(['list-table-options'], {queryParams: {'table': 'majors'}});
      }, err => {
        this.toastr.error('Some Error Occurred!');
      });
    } else {
      this.toastr.error('Check all the fields are correct');
    }
  }
  onUpdateSchool() {
    let id = this.dataService.schoolData.school_id;
    const formValue = this.updated_schoolGroup.value;
    if (this.updated_schoolGroup.valid) {
      this.dataService.update_school_data(id, {
        school_id: id,
        school_name: formValue.school_name,
        state_name: formValue.state_name
      }).subscribe(res => {
        this.toastr.success('Updated Successfully!');
        this.router.navigate(['list-table-options'],  {queryParams: {'table': 'schools'}});
      }, err => {
        this.toastr.error('Some Error Occurred!');
      });
    } else {
      this.toastr.error('Check all the fields are correct');
    }
  }
  onUpdateMajorReq() {
    let id = this.dataService.majorReqData.major_req_id;
    const formValue = this.updated_majorReqGroup.value;
    if (this.updated_majorReqGroup.valid) {
      this.dataService.update_majorReq_data(id, {
        major_req_id: id,
        description: formValue.description,
        major_id: formValue.major_id
      }).subscribe(res => {
        this.toastr.success('Updated Successfully!');
        this.router.navigate(['list-table-options'], {queryParams: {'table': 'majorReq'}});
      }, err => {
        this.toastr.error('Some Error Occurred!');
      });
    } else {
      this.toastr.error('Check all the fields are correct');
    }
  }
  onUpdateTransferCourse() {
    let id = this.dataService.transferCourseData.transfer_course_id;
    const formValue = this.updated_transferCourseGroup.value;
    if (this.updated_transferCourseGroup.valid) {
      this.dataService.update_transfercourse_data(id, {
        transfer_course_id: id,
        subject_number: formValue.subject_number,
        title: formValue.title,
        school_id: formValue.school_id
      }).subscribe(res => {
        this.toastr.success('Updated Successfully!');
        this.router.navigate(['list-table-options', , {queryParams: {'table': 'transferCourse'}}]);
      }, err => {
        this.toastr.error('Some Error Occurred!');
      })
    } else {
      this.toastr.error('Check all the fields are correct');
    }
  }
}
