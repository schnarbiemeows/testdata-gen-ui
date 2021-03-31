import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { ResponseMessage } from '../models/ResponseMessage';
import { InitialConfig } from '../models/InitialConfig';
import { UserConfig } from '../models/UserConfig';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class HomePageService {
  getConfigURL: string = 'http://localhost:8081/testdata-gen/config';
  postUserConfig: string = 'http://localhost:8081/testdata-gen/userconfig';
  constructor(private http: HttpClient) { }

  getPageConfig(): Observable<InitialConfig> {
    return this.http.get<InitialConfig>(this.getConfigURL);
  }

  createServingTypes(data: UserConfig): Observable<UserConfig> {
		return this.http.post<UserConfig>(this.postUserConfig, data, httpOptions);
	}
}
