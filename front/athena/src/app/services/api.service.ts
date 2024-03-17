import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  baseUrl = 'http://localhost:8000/';
  baseHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }

  getData(path: string) {
    return this.http.get(this.baseUrl + path, { headers: this.baseHeaders });
  };

  postData(path: string, data: any) {
    return this.http.post(this.baseUrl + path, data, { headers: this.baseHeaders });
  };
}
