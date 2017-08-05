import { Component, OnInit } from '@angular/core';
import { AuditService } from '../services/index';

import * as _ from 'lodash';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css']
})
export class AuditLogComponent implements OnInit {
  public auditLogs = []
  public audit_source = [];
  public audit_severity = [];
  public range: Number = 0;
  constructor(private auditService: AuditService) { }

  ngOnInit() {
    this.getAuditLogs(0)
  }

  public getAuditLogs(limit: Number = 0): void {
    if (limit == null) {
      limit = 0;
    }
    this.range = limit;
    console.log("Limit: ", this.range);
    this.auditLogs = []
    this.auditService.getAuditLogs(limit).
      subscribe(
      data => {
        this.auditLogs = data.audit

        this.audit_source = this.auditLogs.map(function (a) { return a.source; });
        this.audit_source = _.uniq(this.audit_source)

        this.audit_severity = this.auditLogs.map(function (a) { return a.severity; });
        this.audit_severity = _.uniq(this.audit_severity)
        console.log("Source", this.audit_severity)
      },
      error => { console.log("error", error) })
  }
}
