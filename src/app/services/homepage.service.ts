import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { ResponseMessage } from '../models/ResponseMessage';
import { InitialConfig } from '../models/InitialConfig';
import { UserConfig } from '../models/UserConfig';

const httpOptions = {
  responseType: 'blob',
  headers: new HttpHeaders({'Accept': 'application/json'})
}

@Injectable()
export class HomePageService {
  getConfigURL: string = 'http://localhost:8081/testdata-gen/config';
  postUserConfig: string = 'http://localhost:8081/testdata-gen/makedata';
  constructor(private http: HttpClient) { }

  getPageConfig(): Observable<InitialConfig> {
    return this.http.get<InitialConfig>(this.getConfigURL);
  }

  makeData(data: UserConfig, type: String): Observable<any> {
		return this.http.post(this.postUserConfig, data, { observe : 'response' ,
      responseType : 'blob',
      headers: new HttpHeaders({'Accept': "'" + type + "'"})});
	}
}
