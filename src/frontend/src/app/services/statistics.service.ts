import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { Utils } from './utils'

@Injectable()
export class StatisticsService {
  // private instance variable to hold base url
  private GET_STATISTICS = Utils.BASE_URL + "statistics"
  private GET_CATEGORY_URL = Utils.BASE_URL + "category"

  constructor(private http: Http) { }

  /**
   *    GET  | /foglamp/statistics 
   */
  public getStatistics() {
    return this.http.get(this.GET_STATISTICS)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
  }
}
