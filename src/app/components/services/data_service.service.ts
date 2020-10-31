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
    return this.http.get(this.api_url + '/transferevaluation/');
  }
  get_distinct_state() {
    return this.http.get(this.api_url + '/distinctstate');
  }
  get_distinctmajor() {
    return this.http.get(this.api_url + '/distinctmajor');
  }
  get_distinctschool() {
    return this.http.get(this.api_url + '/distinctschool');
  }

}
