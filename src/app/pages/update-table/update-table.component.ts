import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from 'src/app/components/services/data_service.service';

@Component({
  selector: 'app-update-table',
  templateUrl: './update-table.component.html',
  styleUrls: ['./update-table.component.css']
})
export class UpdateTableComponent implements OnInit {

  addTransferEvaluation;
  majorField = new FormControl(null);
  majorReqId = new FormControl(null);
  transferCourseId = new FormControl(null);
  transferCourseSubject = new FormControl(null);
  transferCourseTitle = new FormControl(null);
  approverId = new FormControl(null);
  approversName = new FormControl(null);
  schoolId = new FormControl(null);
  schoolField = new FormControl(null);
  sem_year_taken = new FormControl(null, Validators.required);
  approved_status = new FormControl('Yes', Validators.required);
  expiration_date = new FormControl(null, Validators.required);
  notes = new FormControl(null, Validators.required);

  majorOptions = [];
  schoolOptions = [];
  courseSubjectOptions = [];
  courseTitleOptions = [];
  approverOptions = [];
  transferCourseOptions = [];
  majorReqOptions = [];

  isUpdate = true;
  updateTableData = null;

  constructor(private dataService: DataService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    const oldTableData = this.dataService.updateTableItem;
    this.updateTableData = oldTableData;
    if (this.isUpdate) {
      if (!oldTableData) {
        this.route.navigateByUrl('dashboard');
      } else {
        this.majorField.setValue(oldTableData.major_req_id.major_id.major_name);
        this.majorReqId.setValue(oldTableData.major_req_id.major_req_id);
        this.schoolField.setValue(oldTableData.transfer_course_id.school_id.school_name);
        this.sem_year_taken.setValue(oldTableData.sem_year_taken);
        this.transferCourseId.setValue(oldTableData.transfer_course_id.transfer_course_id)
        this.transferCourseSubject.setValue(oldTableData.transfer_course_id.subject_number);
        this.transferCourseTitle.setValue(oldTableData.transfer_course_id.title);
        this.notes.setValue(oldTableData.notes)
        this.approved_status.setValue(this.toTitleCase(oldTableData.approved_status));
        this.approverId.setValue(oldTableData.approver_id.approver_id)
        this.approversName.setValue(oldTableData.approver_id.approver_name);
        this.expiration_date.setValue(oldTableData.expiration_date);
      }
    }
    this.addTransferEvaluation =  new FormGroup({
      'majorField': this.majorField,
      'schoolField': this.schoolField,
      'major_req_id': this.majorReqId,
      'sem_year_taken': this.sem_year_taken,
      'transfer_course_id': this.transferCourseId,
      'transferCourseSubject': this.transferCourseSubject,
      'transferCourseTitle': this.transferCourseTitle,
      'approver_id': this.approverId,
      'approved_status': this.approved_status,
      'approver_name': this.approversName,
      'expiration_date': this.expiration_date,
      'notes': this.notes
    });
    this.dataService.get_distinctmajor().subscribe(data => {
      data.map(i => this.majorOptions.push(i['major_name']));
    });
    this.dataService.get_distinctschool().subscribe(data => {
      data.map(i => this.schoolOptions.push(i['school_name']));
    });
    this.dataService.get_transferCourse().subscribe(data => {
      data.map(i => {
        this.courseSubjectOptions.push(i['subject_number']);
        this.courseTitleOptions.push(i['title']);
      });
    });
    this.dataService.get_approver_name().subscribe(data => {
      data.map(i => this.approverOptions.push(i));
    });
    this.dataService.get_transferCourse().subscribe(data => {
      data.map(i => this.transferCourseOptions.push(i));
    });
    this.dataService.get_schools().subscribe(data => {
      data.map(i => this.schoolOptions.push(i));
    });
    this.dataService.get_majorsReq().subscribe(data => {
      data.map(i => {
        this.majorReqOptions.push(i);
        this.majorReqId.setValue(oldTableData.major_req_id.major_req_id);
      });
    })

  }
  onSubmit() {
    if (this.addTransferEvaluation.valid) {
      const data = {
        "transfer_course_id": +this.addTransferEvaluation.get('transfer_course_id').value,
        "major_req_id": +this.addTransferEvaluation.get('major_req_id').value,
        "sem_year_taken": this.addTransferEvaluation.get('sem_year_taken').value,
        "expiration_date": this.addTransferEvaluation.get('expiration_date').value,
        "approved_status": this.addTransferEvaluation.get('approved_status').value,
        "approver_id": +this.addTransferEvaluation.get('approver_id').value,
        "notes": this.addTransferEvaluation.get('notes').value,
      }
      this.dataService.update_table_item(this.updateTableData.transfer_eval_id, data).subscribe(res => {
        this.toastr.success('Updated Successfully')
        this.dataService.updateTableItem = null;
        this.route.navigateByUrl('/dashboard');
      }, err => {
        this.toastr.error('Not updated! Error Occurred!')
      })
    } else {
      this.addTransferEvaluation.markAllAsTouched();
      this.toastr.error('Please check all fields are correct', 'Form Error', {
          timeOut: 10000,
          positionClass: 'toast-top-right',
        });
    }
  }
  onMajorReqIdChange(event) {
    this.majorReqOptions.map(data => {
      if(data.major_req_id === +event.target.value){
        this.dataService.get_major_item(data.major_id).subscribe(res => {
          this.majorField.setValue(res.major_name)
        }, err => {
          this.toastr.error('Some Error Occurred')
        })
      }
    })
  }
  onTransferCourseChange(event) {
    this.transferCourseOptions.map(data => {
      if(data.transfer_course_id === +event.target.value){
        this.transferCourseSubject.setValue(data.subject_number);
        this.transferCourseTitle.setValue(data.title);
        this.dataService.get_school_item(data.school_id).subscribe(res=> {
          this.schoolField.setValue(res.school_name);
        }, err => {
          this.toastr.error('Some Error Occurred')
        })
      }
    })
  }
  onApproverIdChange(event) {
    this.approverOptions.map(data => {
      if(data.approver_id === +event.target.value) {
        this.approversName.setValue(data.approver_name)
      }
    })
  }
  private toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
}
