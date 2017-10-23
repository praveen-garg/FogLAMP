import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class ServicesHealthService {
  private GET_PING_URL = environment.BASE_URL + 'ping';
  private GET_SERVICES_DATA_URL = environment.BASE_URL + 'service';
  // private GET_SERVICE_HEALTH_URL = 'foglamp/service/ping';

  constructor(private http: Http) { }

  /**
     *  GET  | /foglamp/ping
     */
  pingService() {
    return this.http.get(this.GET_PING_URL)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'));
  }

  /**
   *  GET  | /foglamp/service
   */
  getServicesData() {
    return this.http.get(this.GET_SERVICES_DATA_URL)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'));
  }

  // TODO: FOGL-516
  checkServiceHealth(URL) {
    // console.log(' FINAL URL: ', URL + this.GET_SERVICE_HEALTH_URL);
    // return this.http.get(URL + this.GET_SERVICE_HEALTH_URL)
    //   .map(response => response.json())
    //   .catch((error: Response) => Observable.throw(error.json().message || 'Server error'));
  }
}
