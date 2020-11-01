import { Major, Schools, States } from '../../../model/common.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  isLogin: false;
  api_url: string = environment.API_url;
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

  get_transferevaluationmaindisplay(state_name, school_name, major_name) {
    return this.http.get<any[]>(this.api_url + '/transferevaluationmaindisplay/' + state_name + '/' + school_name + '/' + major_name + '/');
  }
}
