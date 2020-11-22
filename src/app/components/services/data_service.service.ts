import { Majors, MajorRequirement, Approvers } from './../../../model/common.model';
import { Major, Schools, States, TransferCourses } from '../../../model/common.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  isLogin: false;
  api_url: string = environment.API_url;
  public transferTableData = null;
  public approversData = null;
  public schoolData = null;
  public transferCourseData = null;
  public majorData = null;
  public majorReqData = null;
  constructor(private http: HttpClient) {
  }
  get_table_data() {
    return this.http.get<any[]>(this.api_url + '/transferevaluation/');
  }
  get_distinct_state() {
    return this.http.get<States[]>(this.api_url + '/distinctstate/');
  }
  get_distinctmajor() {
    return this.http.get<Major[]>(this.api_url + '/distinctmajor/');
  }
  get_distinctschool() {
    return this.http.get<Schools[]>(this.api_url + '/distinctschool/');
  }
  get_majors() {
    return this.http.get<Majors[]>(this.api_url + '/majors/');
  }
  get_schools() {
    return this.http.get<Schools[]>(this.api_url + '/schools/');
  }
  get_majorsReq() {
    return this.http.get<MajorRequirement[]>(this.api_url + '/majorrequirement/');
  }
  get_transferCourse() {
    return this.http.get<TransferCourses[]>(this.api_url + '/transfercourse/');
  }
  get_approver_name() {
    return this.http.get<Approvers[]>(this.api_url + '/approvers/');
  }

  get_transferevaluationmaindisplay(state_name, school_name, major_name) {
    return this.http.get<any[]>(this.api_url + '/transferevaluationmaindisplay/' + state_name + '/' + school_name + '/' + major_name + '/');
  }

  post_checktransferevaluation(data) {
    return this.http.post(this.api_url + '/checktransferevaluation/', data);
  }
  post_major_data(data) {
    return this.http.post(this.api_url + '/majors/', data);
  }
  post_school_data(data) {
    return this.http.post(this.api_url + '/schools/', data);
  }
  post_approver_data(data) {
    return this.http.post(this.api_url + '/approvers/', data);
  }
  post_transfer_data(data) {
    return this.http.post(this.api_url + '/approvers/', data);
  }
  delete_transfer_data(id) {
    return this.http.delete(this.api_url + '/transferevaluation/' + id + '/');
  }
  delete_approver_item(id) {
    return this.http.delete(this.api_url + '/approvers/' + id + '/')
  }
  delete_major_item(id) {
    return this.http.delete(this.api_url + '/majors/' + id + '/')
  }
  delete_majorReq_item(id) {
    return this.http.delete(this.api_url + '/majorrequirement/' + id + '/')
  }
  delete_transfercourse_item(id) {
    return this.http.delete(this.api_url + '/transfercourse/' + id + '/')
  }
  update_major_data(id, data) {
    return this.http.put(this.api_url + '/majors/' + id  + '/', data);
  }
  update_school_data(id, data) {
    return this.http.put(this.api_url + '/schools/' + id  + '/', data);
  }
  update_approvers_data(id, data) {
    return this.http.put(this.api_url + '/approvers/' + id  + '/', data);
  }
  update_majorReq_data(id, data) {
    return this.http.put(this.api_url + '/majorrequirement/' + id + '/', data);
  }
  update_transfercourse_data(id, data) {
    return this.http.put(this.api_url + '/transfercourse/' + id + '/', data);
  }
}
