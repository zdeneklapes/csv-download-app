import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import * as process from "node:process";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'https://api.ximilar.com/account/v2/reports/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Token ${environment.XIMILAR_APIKEY}`
    })
  };

  constructor(private http: HttpClient) {}

  getReport(params: { [key: string]: string }): Observable<any> {
    const url = this.constructUrl(params);
    return this.http.get<any>(url, this.httpOptions);
  }

  private constructUrl(params: { [key: string]: string }): string {
    const queryParams = new URLSearchParams(params).toString();
    return `${this.baseUrl}?${queryParams}`;
  }
}
