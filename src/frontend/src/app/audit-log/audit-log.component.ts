import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../services/index';

import * as _ from 'lodash';    

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css']
})
export class AuditLogComponent implements OnInit {
public auditLogs = []
public audit_source = [];
  constructor(private statisticsService : StatisticsService) { }

  ngOnInit() {
    this.getAuditLogs()
  }

 public getAuditLogs(): void {
   this.auditLogs = []
    this.statisticsService.getAuditLogs().
      subscribe(
      data => {
        this.auditLogs = data.audit
        this.audit_source = this.auditLogs.map(function(a) {return a.source;});
        this.audit_source = _.uniq(this.audit_source)
        console.log("Source", this.audit_source)
      },
      error => { console.log("error", error) })
  }

}
