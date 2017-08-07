import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import Utils, { BASE_URL } from './utils'

@Injectable()
export class AuditService {
  private GET_AUDIT_LOGS = BASE_URL + "audit"

  constructor(private http: Http) { }


  /**
     *  GET | /foglamp/audit  
     */
  public getAuditLogs(limit: Number = 0, offset: Number = 0) {
    let params: URLSearchParams = new URLSearchParams();
    return this.http.get(this.GET_AUDIT_LOGS, { params: { limit: limit, skip: offset } })
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
  }
}