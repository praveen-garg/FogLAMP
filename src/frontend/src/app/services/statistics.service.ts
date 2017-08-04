import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import  Utils, {BASE_URL} from './utils'


@Injectable()
export class StatisticsService {

  private GET_STATISTICS = BASE_URL + "statistics"
  private GET_STATISTICS_HISTORY = BASE_URL + "statistics/history?limit=5"

  private GET_SCHEDULE_PROCESS = BASE_URL + "schedule/process"
  private GET_SCHEDULES = BASE_URL + "schedules"

  private GET_TASKS = BASE_URL + "tasks"
  private GET_LATEST_TASKS = BASE_URL + "tasks/latest"

  private GET_AUDIT_LOGS = BASE_URL + "audit"

  constructor(private http: Http) { }

  /**
   *    GET  | /foglamp/statistics 
   */
  public getStatistics() {
    return this.http.get(this.GET_STATISTICS)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
  }

  /**
   *  GET | /foglamp/statistics/history 
   */
  public getStatisticsHistory() {
    return this.http.get(this.GET_STATISTICS_HISTORY)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
  }

  /**
   *  GET | /foglamp/schedules 
   */
  public getSchedules() {
    return this.http.get(this.GET_SCHEDULES)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
  }

  /**
   *  GET | /foglamp/schedule/process 
   */
  public getScheduledProcesses() {
    return this.http.get(this.GET_SCHEDULE_PROCESS)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
  }

  /**
   *  GET | /foglamp/tasks/latest
   */
  public getLatestTasks() {
    return this.http.get(this.GET_LATEST_TASKS)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
  }

/**
   *  GET | /foglamp/audit  
   */
  public getAuditLogs() {
    return this.http.get(this.GET_AUDIT_LOGS)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
  }



}
