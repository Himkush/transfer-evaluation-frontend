import { Router } from '@angular/router';
import { DataService } from './../../components/services/data_service.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-options-table',
  templateUrl: './list-options-table.component.html',
  styleUrls: ['./list-options-table.component.css']
})
export class ListOptionsTableComponent implements OnInit {
  approverSource = new MatTableDataSource([]);
  schoolSource = new MatTableDataSource([]);
  majorSource = new MatTableDataSource([]);
  majorReqSource = new MatTableDataSource([]);
  transferCourseSource = new MatTableDataSource([]);
  approverColumns = ['approver_id', 'approver_name', 'update', 'delete'];
  majorColumns = ['major_id', 'major_name', 'update', 'delete'];
  schoolColumns = ['school_id', 'school_name', 'state_name', 'update', 'delete'];
  majorReqColumns = ['major_req_id', 'description', 'update', 'delete'];
  transferCourseColumns = ['transfer_course_id', 'subject_number', 'title', 'school_id', 'update', 'delete'];


  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  constructor(private dataService: DataService,
              private dialogService: MatDialog,
              private router: Router,
              private toastr: ToastrService) { }
  ngOnInit(): void {
    this.get_approver_data();
    this.get_school_data();
    this.get_major_data();
    this.get_major_req_data();
    this.get_transferCourse_data();
  }
  get_approver_data() {
    this.dataService.get_approver_name().subscribe(data => {
        this.approverSource = new MatTableDataSource(data);
        setTimeout(() => this.approverSource.paginator = this.paginator.toArray()[0]);
    });
  }
  get_school_data() {
    this.dataService.get_schools().subscribe(data => {
        this.schoolSource = new MatTableDataSource(data);
        setTimeout(() => this.schoolSource.paginator = this.paginator.toArray()[1]);
    });
  }
  get_major_data() {
    this.dataService.get_majors().subscribe(data => {
        this.majorSource = new MatTableDataSource(data);
        setTimeout(() => this.majorSource.paginator = this.paginator.toArray()[2]);
    });
  }
  get_major_req_data() {
    this.dataService.get_majorsReq().subscribe(data => {
        this.majorReqSource = new MatTableDataSource(data);
        setTimeout(() => this.majorReqSource.paginator = this.paginator.toArray()[3]);
    });
  }
  get_transferCourse_data() {
    this.dataService.get_transferCourse().subscribe(data => {
        this.transferCourseSource = new MatTableDataSource(data);
        setTimeout(() => this.transferCourseSource.paginator = this.paginator.toArray()[4]);
    });
  }
  delete_approver_item(data) {
    // tslint:disable-next-line: no-use-before-declare
    let dialogRef = this.dialogService.open(DeleteOptionsDialogComponent,{
      data: {...data, name: 'approver'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 'approver') {
        this.dataService.delete_approver_item(data.approver_id).subscribe(res => {
          this.get_approver_data();
          this.toastr.success('Successfully Deleted!');
        }, err => {
          this.toastr.error('Data not Deleted!');
        });
      }
    });
  }
  delete_majors_item(data) {
    const dialogRef = this.dialogService.open(DeleteOptionsDialogComponent,{
      data: {...data, name: 'majors'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'majors') {
        this.dataService.delete_major_item(data.major_id).subscribe(res => {
          this.get_major_data();
          this.toastr.success('Successfully Deleted!');
        }, err => {
          this.toastr.error('Data not Deleted!');
        });
      }
    });
  }
  delete_schools_item(data) {
    const dialogRef = this.dialogService.open(DeleteOptionsDialogComponent,{
      data: {...data, name: 'schools'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'schools') {
        this.dataService.delete_majorReq_item(data.school_id).subscribe(res => {
          this.get_school_data();
          this.toastr.success('Successfully Deleted!');
        }, err => {
          this.toastr.error('Data not Deleted!');
        });
      }
    });
  }
  delete_majorsReq_item(data) {
    const dialogRef = this.dialogService.open(DeleteOptionsDialogComponent,{
      data: {...data, name: 'majorsReq'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'majorsReq') {
        this.dataService.delete_majorReq_item(data.major_req_id).subscribe(res => {
          this.get_major_req_data();
          this.toastr.success('Successfully Deleted!');
        }, err => {
          this.toastr.error('Data not Deleted!');
        });
      }
    });
  }
  delete_transfercourse_item(data) {
    const dialogRef = this.dialogService.open(DeleteOptionsDialogComponent,{
      data: {...data, name: 'transfercourse'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'transfercourse') {
        this.dataService.delete_transfercourse_item(data.transfer_course_id).subscribe(res => {
          this.get_transferCourse_data();
          this.toastr.success('Successfully Deleted!');
        }, err => {
          this.toastr.error('Data not Deleted!');
        });
      }
    });
  }
  update_school_item(data) {
    this.dataService.schoolData = data;
    this.router.navigate(['add-new-options'], {queryParams: {'schools': true, 'update': true}});
  }
  update_major_item(data) {
    this.dataService.majorData = data;
    this.router.navigate(['add-new-options'], {queryParams: {'majors': true, 'update': true}});
  }
  update_majorReq_item(data) {
    this.dataService.majorReqData = data;
    this.router.navigate(['add-new-options'], {queryParams: {'majorReqs': true, 'update': true}});
  }
  update_transfercourse_item(data) {
    this.dataService.transferCourseData = data;
    this.router.navigate(['add-new-options'], {queryParams: {'transferCourses': true, 'update': true}});
  }
  update_approver_item(data) {
    console.log(data)
    this.dataService.approversData = data;
    this.router.navigate(['add-new-options'], {queryParams: {'approvers': true, 'update': true}});
  }
}
@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteOptionsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
