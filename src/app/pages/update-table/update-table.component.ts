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
  majorField = new FormControl(null, Validators.required);
  transferCourseSubject = new FormControl(null, Validators.required);
  transferCourseTitle = new FormControl(null, Validators.required);
  approversName = new FormControl(null, Validators.required);
  schoolField = new FormControl(null, Validators.required);
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
  sem_year_taken = new FormControl(null, Validators.required);
  unhm_equivalent = new FormControl(null, Validators.required);
  approved_status = new FormControl('Yes', Validators.required);
  expiration_date = new FormControl(null, Validators.required);
  isUpdate = false;

  constructor(private dataService: DataService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    const oldTableData = this.dataService.transferTableData;
    if (this.isUpdate) {
      if (!oldTableData) {
        this.route.navigateByUrl('addTables');
      } else {
        this.majorField.setValue(oldTableData.majorField);
        this.schoolField.setValue(oldTableData.schoolField);
        this.sem_year_taken.setValue(oldTableData.sem_year_taken);
        this.transferCourseSubject.setValue(oldTableData.transferCourseSubject);
        this.transferCourseTitle.setValue(oldTableData.transferCourseTitle);
        this.unhm_equivalent.setValue(oldTableData.unhm_equivalent);
        this.approved_status.setValue(oldTableData.approved_status);
        this.approversName.setValue(oldTableData.approver_name);
        this.expiration_date.setValue(oldTableData.expiration_date);
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
      'expiration_date': this.expiration_date
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
    console.log(this.addTransferEvaluation.value);
    if (this.addTransferEvaluation.valid) {
      console.log(this.addTransferEvaluation.value);
      this.dataService.transferTableData = this.addTransferEvaluation.value;
      this.route.navigateByUrl('/checktransferevaluation');
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
