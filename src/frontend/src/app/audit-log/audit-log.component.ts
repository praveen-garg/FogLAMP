import { Component, OnInit } from '@angular/core';
import { AuditService } from '../services/index';

import * as _ from 'lodash';

enum SeverityEnum {
  FATAL = 1,
  ERROR = 2,
  WARNING = 3,
  INFORMATION = 4
}

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css']
})
export class AuditLogComponent implements OnInit {
  public auditLogs = []
  public sourceOptionsList = []
  public severityLevelsList = []
  public filterdData = []
  public limit: Number = 0;
  public offset: Number = 0;
  constructor(private auditService: AuditService) { }

  ngOnInit() {
    this.getAuditLogs()
    // Add SeverityEnum to severityLevelsList
    // TODO: Severity keys must be coming from service
    for (let item in SeverityEnum) {
      if (isNaN(Number(item))) {
        console.log(item);
        this.severityLevelsList.push(item)
      }
    }
  }
  
   public setLimit(limit: Number) {
       this.limit = limit;
       console.log("Limit: ", limit)
       this.getAuditLogs()
   }

  public setOffset(offset: Number) {
      this.offset = offset
      console.log("offset: ", offset)
      if(this.limit != null) {
        
        this.getAuditLogs()
      }
  }
 
  public getAuditLogs(): void {
    console.log("Limit: ", this.limit)
    console.log("offset: ", this.offset)
    if (this.limit == null) {
      this.limit = 0;
    }
    if (this.offset == null) {
      this.offset = 0;
    }
    this.auditLogs = []
    this.auditService.getAuditLogs(this.limit, this.offset).
      subscribe(
      data => {
        this.filterdData = this.auditLogs = data.audit
        // TODO: source must come from service to know actual superset of sources
        this.sourceOptionsList = _.uniq(this.auditLogs.map(function (a) { return a.source }))
        //this.severityLevelsList = _.uniq(this.auditLogs.map(function (a) { return a.severity }))
      },
      error => { console.log("error", error) })
  }

  public filterSource(type, event) {
    this.filterdData = [];
    console.log("Type: ", event.target.value)
    if (event.target.value.trim().toLowerCase() == "source" || event.target.value.trim().toLowerCase() == "severity") {
      this.filterdData = this.auditLogs;
      console.log("All records: ", this.filterdData)
      return;
    }
    if (type == "severity") {
      this.filterdData = this.auditLogs.filter(element => element.severity.toLowerCase() === (event.target.value.trim().toLowerCase()))
      console.log("Filtered Severity: ", this.filterdData)
      return;
    }
    this.filterdData = this.auditLogs.filter(element => element.source.toLowerCase() === (event.target.value.trim().toLowerCase()))
    console.log("Filtered Source: ", this.filterdData)
  }

}
