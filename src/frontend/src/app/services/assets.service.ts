import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import Utils, { BASE_URL } from './utils'

@Injectable()
export class AssetsService {
  private GET_ASSET = BASE_URL + "asset"

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
  *    GET  |  foglamp/asset/{asset_code}/{reading}/summary
  *    Return a summary (min, max and average) for the specified asset and sensor
  */
  public setOfAssetReading(asset_code) {
    return this.http.get(this.GET_ASSET + "/" + asset_code)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'))
  }

}
