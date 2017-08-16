import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import Utils, {BASE_URL} from './utils'

@Injectable()
export class ConfigurationService {
    // private instance variable to hold base url
    private GET_CATEGORIES_URL = BASE_URL + "categories"
    private GET_CATEGORY_URL = BASE_URL + "category"
    private GET_PING_URL = BASE_URL + "ping"

    constructor(private http: Http) { }

    /**
     *  GET  | /foglamp/ping    
     */
    pingService() {
        return this.http.get(this.GET_PING_URL)
            .map(response => response.json())
            .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
    }


    /**
     *   GET  | /foglamp/categories
     */
    getCategories() {
        return this.http.get(this.GET_CATEGORIES_URL)
            .map(response => response.json())
            .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
    }

    /**
     *   GET  | /foglamp/category/{category_name} 
     */
    getCategory(category_name) {
        return this.http.get(this.GET_CATEGORY_URL + "/" + category_name)
            .map(response => response.json())
            .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
    }

    /**
     * DELETE  | /foglamp/category/{category_name}/{config_item}  
     */
    deleteConfigItem(category_name: string, config_item: string) {
        return this.http.delete(this.GET_CATEGORY_URL + "/" + category_name + "/" + config_item)
            .map(response => response.json())
            .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
    }

    /**
    *  PUT  | /foglamp/category/{category_name}/{config_item}  
    */
    editConfigItem(category_name: string, config_item: string, value: string) {
        let body = JSON.stringify({ "value": value });
        return this.http.put(this.GET_CATEGORY_URL + "/" + category_name + "/" + config_item, body)
            .map(response => response.json())
            .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
    }
}
