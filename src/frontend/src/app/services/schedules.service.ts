import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import  Utils, {BASE_URL} from './utils'

@Injectable()
export class SchedulesService {
 private GET_SCHEDULE_PROCESS = BASE_URL + "scheduled/processes"
  private GET_SCHEDULES = BASE_URL + "schedules"

  private GET_TASKS = BASE_URL + "tasks"
  private GET_LATEST_TASKS = BASE_URL + "tasks/latest"

  constructor(private http:Http) { }

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

}
