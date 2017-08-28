import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { environment } from '../../environments/environment';

@Injectable()
export class AssetsService {
  private GET_ASSET = environment.BASE_URL + "asset"

  constructor(private http: Http) { }

  /**
  *    GET  | foglamp/asset
  *    Return a summary count of all asset readings
  */
  public getAsset() {
    return this.http.get(this.GET_ASSET)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
  }

  /**
  *  /foglamp/asset/{asset_code}
  *  Return a set of asset readings for the given asset 
  */
  public getAssetReadings(asset_code) {
    return this.http.get(this.GET_ASSET + "/" + asset_code)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
  }
}