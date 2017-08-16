import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import  Utils, {BASE_URL} from './utils'

@Injectable()
export class SchedulesService {
 private GET_SCHEDULE_PROCESS = BASE_URL + "schedule/process"
  private GET_SCHEDULE = BASE_URL + "schedule"

  private GET_TASK = BASE_URL + "task"
  private GET_LATEST_TASK = BASE_URL + "task/latest"

  constructor(private http:Http) { }

  /**
   *  GET | /foglamp/schedule
   */
  public getSchedule() {
    return this.http.get(this.GET_SCHEDULE)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
  }

  /**
   *  GET | /foglamp/schedule/process 
   */
  public getScheduledProcess() {
    return this.http.get(this.GET_SCHEDULE_PROCESS)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
  }

  /**
   *  GET | /foglamp/task/latest
   */
  public getLatestTask() {
    return this.http.get(this.GET_LATEST_TASK)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
  }

}
