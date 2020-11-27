import { ToastrService } from 'ngx-toastr';
import { Major } from '../../../model/common.model';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from './../../components/services/data_service.service';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  public datasets: any;
  public data: any;
  tableLoading = true;
  tableError = false;
  dataSource = new MatTableDataSource([]);
  searchForm: FormGroup;
  majorField = new FormControl('All');
  filteredMajor: Observable<string[]>;
  schoolField = new FormControl('All');
  filteredSchool: Observable<string[]>;
  stateField = new FormControl('All');
  filteredState: Observable<string[]>;
  majorOptions = ['All'];
  schoolOptions = ['All'];
  stateOptions = ['All'];

  displayedColumns = ['id', 'approved_status', 'subject_number', 'title', 'school_name', 'school_state', 'major_description', 'major_name', 'approver_name', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dataService: DataService,
              private dialogService: MatDialog,
              private toastr: ToastrService) {}
  ngOnInit() {
    this.searchForm = new FormGroup({
      'majorField': this.majorField,
      'schoolField': this.schoolField,
      'stateField': this.stateField
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
        map(value => value ? this._filter(value, this.schoolOptions): this.schoolOptions.slice())
      );
    });
    this.dataService.get_distinct_state().subscribe(data => {
      data.map(i => this.stateOptions.push(i['state_name']));
      this.filteredState = this.stateField.valueChanges.pipe(
        startWith(''),
        map(value => value ? this._filter(value, this.stateOptions): this.stateOptions.slice())
      );
    });
    this.get_transfer_eval_data();

  }
  get_transfer_eval_data() {
    this.tableLoading = true;
    this.dataService.get_table_data().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.tableLoading = false;
        setTimeout(() => this.dataSource.paginator = this.paginator);
    }, err => {
      this.tableLoading = false;
      this.tableError = true;
      this.toastr.error('Some Error Occurred!');
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  inputControl(event, options, field) {
    setTimeout(() => {
        let isValueTrue = options.filter(myAlias => {
              return myAlias.includes(event.target.value);
            });
        if (isValueTrue.length === 0) {
            field.setValue('All');
        }
    }, 300);
  }

  search_tables() {
    if (this.searchForm.dirty) {
      this.dataService.get_transferevaluationmaindisplay(this.stateField.value, this.schoolField.value, this.majorField.value).subscribe(data =>{
        this.dataSource = new MatTableDataSource(data);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        this.searchForm.markAsPristine();
      })
    }
  }
  onDelete(data) {
    const dialogRef = this.dialogService.open(DeleteDialogComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.delete_transfer_data(data.transfer_eval_id).subscribe(res => {
          this.get_transfer_eval_data();
          this.toastr.success('Successfully Deleted!')
        }, err => {
          this.toastr.error('Data not Deleted!')
        });
      }
    });
  }

  public updateOptions() {
  }

   private _filter(value: string, options): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
@Component({
  selector: 'dashboard-delete-dialog',
  templateUrl: 'dashboard-delete-dialog.html',
})
export class DeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
