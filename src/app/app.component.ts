import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ReportService} from './report.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatProgressSpinner} from "@angular/material/progress-spinner";

export interface ReportsSeries {
  id: string;
  name: string;
  credits: number[];
  requests: number[];
}

export interface Report {
  min: { hour: string; day: string; week: string; month: string };
  period_start: string;
  period_end: string;
  granularity: string;
  x: string[];
  series: ReportsSeries[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    MatProgressSpinner
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'csv-download-app';
  csvUrl: SafeUrl | null = null;
  params = {
    // period_start: new Date(2024, 5, 20),
    period_start: '2024-06-20',
    type: 'request_types',
    services: 'generic-tagging',
    granularity: 'hour',
    limits: 'true'
  };

  types = ['request_types'];
  services = ['generic-tagging'];
  granularities = ['hour', 'day', 'week', 'month'];

  constructor(private reportService: ReportService, private sanitizer: DomSanitizer) {
    console.log(this.params);
    this.generateCSVLink()
  }

  generateCSVLink() {
    this.csvUrl = null;
    const formattedParams = {...this.params, period_start: this.params.period_start.toString()};
    this.reportService.getReport(formattedParams).subscribe(report => {
      const csvData = this.convertReportToCSV(report);
      const blob = new Blob([csvData], {type: 'text/csv'});
      const url = window.URL.createObjectURL(blob);
      this.csvUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    });
  }

  csvLink(): SafeUrl | null {
    return this.csvUrl;
  }

  private convertReportToCSV(report: Report): string {
    const rows = [];
    const header = ['date', 'series name', 'credits', 'requests'];
    rows.push(header.join(','));

    report.series.forEach(series => {
      series.credits.forEach((credit, index) => {
        const date = report.x[index];
        const request = series.requests[index];
        const row = [date, series.name, credit, request];
        rows.push(row.join(','));
      });
    });

    const joinedRows = rows.join('\n');
    console.log(joinedRows);
    return joinedRows;
  }
}
