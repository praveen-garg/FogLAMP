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

  public limit: Number = 0;
  public offset: Number = 0;
  public source: String = '';
  public severity: String = '';

  constructor(private auditService: AuditService, private alertService: AlertService) { }

  ngOnInit() {
    this.getLogSource();
    this.getLogSeverity();
    this.getAuditLogs();
  }

  public getLogSource() {
    this.auditService.getLogSource().
      subscribe(
      data => {
         if (data.error) {
          console.log('error in response', data.error);
          this.alertService.error(data.error.message)
          return;
        }
        this.logSourceList = data.log_code
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

  public setLimit(limit: Number) {
    this.limit = limit;
    console.log('Limit: ', limit);
    this.getAuditLogs();
  }

  public setOffset(offset: Number) {
    this.offset = offset;
    console.log('offset:', offset);
    if (this.limit != null) {
      this.getAuditLogs();
    }
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
    this.auditService.getAuditLogs(this.limit, this.offset, this.source, this.severity).
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
