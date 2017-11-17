import { Component, OnInit } from '@angular/core';
import { AuditService, AlertService } from '../services/index';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css']
})
export class AuditLogComponent implements OnInit {
  public logSourceList = [];
  public logSeverityList = [];
  public filterdData = [];

  limit = 20;
  offset = 0;
  public source: String = '';
  public severity: String = '';

  page = 1;             // Default page is 1 in pagination
  recordCount = 100;    // Total no. of records during pagination (For now it is hard coded, TODO: FOGL-714)
  tempOffset = 0;       // Temporary offset during pagination

  constructor(private auditService: AuditService, private alertService: AlertService) { }

  ngOnInit() {
    this.getLogSource();
    this.getLogSeverity();
    this.getAuditLogs();
  }

  /**
   *  Go to the page on which user clicked in pagination
   */
  goToPage(n: number): void {
    this.page = n;
    this.setLimitOffset();
  }

  /**
   *  Go to the next page
   */
  onNext(): void {
    this.page++;
    this.setLimitOffset();
  }

  /**
   *  Go to the first page
   */
  onFirst(): void {
    this.page = 1;
    this.setLimitOffset();
  }

  /**
   *  Go to the last page
   */
  onLast(n: number): void {
    const p = Math.ceil(this.recordCount / this.limit) || 0;
    this.page = p;
    this.setLimitOffset();
  }

  /**
   *  Go to the previous page
   */
  onPrev(): void {
    this.page--;
    this.setLimitOffset();
  }

  /**
   *  Set limit and offset (it is internally called by goToPage(), onNext(), onPrev(), onFirst(), onLast() methods)
   */
  setLimitOffset() {
    if (this.limit === 0) {
      this.limit = 20;
    }
    if (this.offset > 0) {
      this.tempOffset = (((this.page) - 1) * this.limit) + this.offset;
    } else {
      this.tempOffset = ((this.page) - 1) * this.limit;
    }
    console.log('limit: ', this.limit);
    console.log('offset: ', this.offset);
    console.log('temp offset: ', this.tempOffset);
    this.getAuditLogs();
  }

  public getLogSource() {
    this.auditService.getLogSource().
      subscribe(
      data => {
         if (data.error) {
          console.log('error in response', data.error);
          this.alertService.error(data.error.message);
          return;
        }
        this.logSourceList = data.log_code;
        console.log('Log code', this.logSourceList);
      },
      error => { console.log('error', error); });
  }

  public getLogSeverity() {
    this.auditService.getLogSeverity().
      subscribe(
      data => {
         if (data.error) {
          console.log('error in response', data.error);
          this.alertService.error(data.error.message);
          return;
        }
        this.logSeverityList = data.log_severity;
        console.log('Log severity ', this.logSeverityList);
      },
      error => { console.log('error', error); });
  }

  public setLimit(limit: number) {
    if (this.page !== 1) {
      this.page = 1;
      this.tempOffset = this.offset;
    }
    if (limit === null || limit === 0) {
      this.limit = 20;
    } else {
      this.limit = limit;
    }
    console.log('Limit: ', limit);
    this.getAuditLogs();
  }

  public setOffset(offset: number) {
    if (this.page !== 1) {
      this.page = 1;
    }
    this.offset = offset;
    this.tempOffset = offset;
    this.recordCount = this.recordCount - this.offset;
    this.getAuditLogs();
  }

  public getAuditLogs(): void {
    console.log('Limit: ', this.limit);
    console.log('offset: ', this.offset);
    if (this.limit == null) {
      this.limit = 0;
    }
    if (this.offset == null) {
      this.offset = 0;
    }
    this.auditLogSubscriber();
  }

  public filterSource(type, event) {
    if (type === 'source') {
      this.source = event.target.value.trim().toLowerCase() === 'source' ? '' : event.target.value.trim().toLowerCase();
    }
    if (type === 'severity') {
      this.severity = event.target.value.trim().toLowerCase() === 'severity' ? '' : event.target.value.trim().toLowerCase();
    }
    this.auditLogSubscriber();
  }

  auditLogSubscriber() {
    console.log('Limit: ', this.limit, 'Offset: ', this.offset);
    console.log('tempOffset: ', this.tempOffset, 'recordCount: ', this.recordCount);
    this.auditService.getAuditLogs(this.limit, this.tempOffset, this.source, this.severity).
      subscribe(
      data => {
         if (data.error) {
          console.log('error in response', data.error);
          this.alertService.error(data.error.message);
          return;
        }
        this.filterdData = data.audit;
      },
      error => { console.log('error', error); });
  }
}
