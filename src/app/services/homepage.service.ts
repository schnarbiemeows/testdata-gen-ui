import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { UserConfig } from '../models/UserConfig';

const httpOptions = {
  responseType: 'blob',
  headers: new HttpHeaders({'Accept': 'application/json'})
}

@Injectable()
export class HomePageService {
  postUserConfig: string = 'http://localhost:8081/testdata-gen/makedata';
  constructor(private http: HttpClient) { }


  makeData(data: UserConfig, type: String): Observable<any> {
		return this.http.post(this.postUserConfig, data, { observe : 'response' ,
      responseType : 'blob',
      headers: new HttpHeaders({'Accept': "'" + type + "'"})});
	}
}
