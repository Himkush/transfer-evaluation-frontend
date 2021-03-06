import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './../../components/services/data_service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-tables',
  templateUrl: './add-tables.component.html',
  styleUrls: ['./add-tables.component.css']
})
export class AddTablesComponent implements OnInit {

  addTransferEvaluation;
  majorField = new FormControl(null, [Validators.required, Validators.maxLength(30)]);
  transferCourseSubject = new FormControl(null, [Validators.required, Validators.maxLength(30)]);
  transferCourseTitle = new FormControl(null, [Validators.required, Validators.maxLength(30)]);
  approversName = new FormControl(null, [Validators.required, Validators.maxLength(20)]);
  schoolField = new FormControl(null, [Validators.required, Validators.maxLength(30)]);
  filteredMajor: Observable<string[]>;
  filteredSchool: Observable<string[]>;
  filteredTransferCourseSubject: Observable<string[]>;
  filteredTransferCourseTitle: Observable<string[]>;
  filteredApproversName: Observable<string[]>;
  majorOptions = [];
  schoolOptions = [];
  courseSubjectOptions = [];
  courseTitleOptions = [];
  approverNameOptions = [];
  sem_year_taken = new FormControl(null, [Validators.required, Validators.maxLength(20)]);
  unhm_equivalent = new FormControl(null, [Validators.required, Validators.maxLength(20)]);
  approved_status = new FormControl('Yes', Validators.required);
  expiration_date = new FormControl(null, Validators.required);
  notes = new FormControl(null, Validators.required);
  isUpdate = false;

  constructor(private dataService: DataService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) {
                 this.activatedRoute.queryParams.subscribe(params => {
                      this.isUpdate = params['update'] === 'true';
                  });
              }

  ngOnInit(): void {
    const oldTableData = this.dataService.transferTableData;
    if (this.isUpdate) {
      if (!oldTableData) {
        this.route.navigateByUrl('addTables');
      } else {
        this.majorField.setValue(oldTableData.major_name);
        this.schoolField.setValue(oldTableData.school_name);
        this.sem_year_taken.setValue(oldTableData.sem_or_year_taken);
        this.transferCourseSubject.setValue(oldTableData.transfer_subject_number);
        this.transferCourseTitle.setValue(oldTableData.transfer_course_title);
        this.unhm_equivalent.setValue(oldTableData.unhm_equivalent);
        this.approved_status.setValue(oldTableData.approved_status);
        this.approversName.setValue(oldTableData.approver_name);
        this.expiration_date.setValue(oldTableData.expiration_date);
        this.notes.setValue(oldTableData.notes)
      }
    }
    this.addTransferEvaluation =  new FormGroup({
      'majorField': this.majorField,
      'schoolField': this.schoolField,
      'sem_year_taken': this.sem_year_taken,
      'transferCourseSubject': this.transferCourseSubject,
      'transferCourseTitle': this.transferCourseTitle,
      'unhm_equivalent': this.unhm_equivalent,
      'approved_status': this.approved_status,
      'approver_name': this.approversName,
      'expiration_date': this.expiration_date,
      'notes': this.notes
    });
    this.dataService.get_distinctmajor().subscribe(data => {
      data.map(i => this.majorOptions.push(i['major_name']));
      this.filteredMajor = this.majorField.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(value => value ? this._filter(value, this.majorOptions) : this.majorOptions.slice())
    );
    });
    this.dataService.get_distinctschool().subscribe(data => {
      data.map(i => this.schoolOptions.push(i['school_name']));
      this.filteredSchool = this.schoolField.valueChanges.pipe(
        startWith(''),
        map(value => value ? this._filter(value, this.schoolOptions) : this.schoolOptions.slice())
      );
    });
    this.dataService.get_transferCourse().subscribe(data => {
      data.map(i => {
        this.courseSubjectOptions.push(i['subject_number']);
        this.courseTitleOptions.push(i['title']);
      });
      this.filteredTransferCourseSubject = this.transferCourseSubject.valueChanges.pipe(
        startWith(''),
        map(value => value ? this._filter(value, this.courseSubjectOptions) : this.courseSubjectOptions.slice() )
      );
      this.filteredTransferCourseTitle = this.transferCourseTitle.valueChanges.pipe(
        startWith(''),
        map(value => value ? this._filter(value, this.courseTitleOptions) : this.courseTitleOptions.slice())
      );
    });
    this.dataService.get_approver_name().subscribe(data => {
      data.map(i => this.approverNameOptions.push(i['approver_name']));
      this.filteredApproversName = this.approversName.valueChanges.pipe(
        startWith(''),
        map(value => value ? this._filter(value, this.approverNameOptions) : this.approverNameOptions.slice())
      );
    });
  }

  onSubmit() {
    if (this.addTransferEvaluation.valid) {
      const form_data = this.addTransferEvaluation.value;
      const data = {
          'major_name': form_data.majorField,
          'school_name': form_data.schoolField,
          'transfer_subject_number': form_data.transferCourseSubject,
          'transfer_course_title': form_data.transferCourseTitle,
          'unhm_equivalent': form_data.unhm_equivalent,
          'approver_name': form_data.approver_name,
          'approved_status': form_data.approved_status,
          'sem_or_year_taken': form_data.sem_year_taken,
          'expiration_date': form_data.expiration_date,
          'notes': form_data.notes
      }
      if (this.isUpdate && this.dataService.transferTableData) {
        this.dataService.update_checktransferevaluation(this.dataService.transferTableData.check_eval_id,
          {check_eval_id: this.dataService.transferTableData.check_eval_id, ...data}).subscribe(res => {
          this.dataService.transferTableData = res;
          this.route.navigateByUrl('/checktransferevaluation');
        }, err => {
          this.toastr.error('Some Error Occurred!');
        });
      } else {
          this.dataService.post_checktransferevaluation(data).subscribe(res => {
          this.dataService.transferTableData = res;
          this.route.navigateByUrl('/checktransferevaluation');
        }, err => {
          this.toastr.error('Some Error Occurred!');
        });
      }

    } else {
      this.addTransferEvaluation.markAllAsTouched();
      this.toastr.error('Please check all fields are correct', 'Form Error', {
          timeOut: 10000,
          positionClass: 'toast-top-right',
        });
    }
  }

  inputControl(event, options, field) {
    setTimeout(() => {
        let isValueTrue = options.filter(myAlias => {
              return myAlias ? myAlias.includes(event.target.value) : null;
            });
        if (isValueTrue && isValueTrue.length === 0) {
            field.setValue(null);
        }
    }, 300);
  }
   private _filter(value: string, options): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => {
      return option ? option.toLowerCase().indexOf(filterValue) === 0 : null;
    });
  }

}
