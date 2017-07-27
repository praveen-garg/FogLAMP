import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http'
import {Observable} from 'rxjs/Rx'

@Injectable()
export class ConfigurationService {
    // private instance variable to hold base url
    private BASE_URL = 'http://192.168.1.197:8082/foglamp/'
    private GET_CATEGORIES_URL = this.BASE_URL + "categories"

    constructor(private http: Http) {}
    
   /**
    *   GET   | /foglamp/categories
    */
     getCategories() {
        return this.http.get(this.GET_CATEGORIES_URL)
            .map(response => response.json())
            .catch((error:Response) => Observable.throw(error.json().message || 'Server error'))
        }


}
