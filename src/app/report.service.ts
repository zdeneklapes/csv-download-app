import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'https://api.ximilar.com/account/v2/reports/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token c35e00ef3e98f9bce589ef20f7532e9b8d2a4475'
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
