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
  public limit: Number = 0
  public offset: Number = 0
  public source: String = ""
  public severity: String = ""

  constructor(private auditService: AuditService) { }

  ngOnInit() {
    this.getAuditLogs(false)
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
    this.getAuditLogs(true)
  }

  public setOffset(offset: Number) {
    this.offset = offset
    console.log("offset: ", offset)
    if (this.limit != null) {
      this.getAuditLogs(true)
    }
  }

  public getAuditLogs(isFiltered: boolean = false): void {
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
        if (isFiltered) {
          console.log("is Filtered", isFiltered)
          this.filterSource("","");
        }
      },
      error => { console.log("error", error) })
  }

  public filterSource(type, event) {
    this.filterdData = []
    if (type == "source") {
      this.source = event.target.value != "undefined"?event.target.value.trim().toLowerCase():""
    } else if (type == "severity") {
      this.severity = event.target.value != "undefined"?event.target.value.trim().toLowerCase():""
    }

    console.log("Type: ", type)
    console.log("this.source: ", this.source)
    console.log("this.severity: ", this.severity)

    this.filterdData = this.auditLogs.filter(
      element => (element.source.toLowerCase() === this.source && this.severity == "") ||
        (this.source == "" && element.severity.toLowerCase() === this.severity) ||
        (this.source == element.source.toLowerCase() && this.severity === element.severity.toLowerCase()) ||
        (this.source == "source" && this.severity == element.severity.toLowerCase()) ||
        (this.source == element.source.toLowerCase() && this.severity == "severity") ||
        (this.source == "" && this.severity == "severity") ||
        (this.source == "source" && this.severity == "") ||
        (this.source == "source" && this.severity == "severity") ||
        (this.source == "" && this.severity == ""))
  }

}
