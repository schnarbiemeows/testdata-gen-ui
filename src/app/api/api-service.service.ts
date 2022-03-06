import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { UserConfig } from '../models/UserConfig';
import { environment } from '../../environments/environment';
const httpOptions = {
  responseType: 'blob',
  headers: new HttpHeaders({'Accept': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  host = environment.apiUrl;
  postUserConfig: string = `${this.host}/testdata-gen/makedata`;
  constructor(private http: HttpClient) { }

  makeData(data: UserConfig, type: String): Observable<any> {
    return this.http.post(this.postUserConfig, data, { observe : 'response' ,
      responseType : 'blob',
      headers: new HttpHeaders({'Accept': "'" + type + "'"})});
  }
}
