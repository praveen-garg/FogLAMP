import { Component, OnInit } from '@angular/core';
import { AssetsService, AlertService } from '../services/index';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  assetCode: string = ""
  limit: Number = 0;
  offset: Number = 0;
  
  assets = [];
  assetsReadingsData = [];

  constructor(private assetService: AssetsService, private alertService: AlertService) { }

  ngOnInit() {
    this.getAsset();
  }

  public setAssetCode(aCode) {
    this.assetCode = aCode;
    console.log('assetCode: ', aCode);
    this.getAssetReading();
  }
  public setLimit(limit: Number) {
    this.limit = limit;
    console.log('Limit: ', limit);
    this.getAssetReading();
  }

  public setOffset(offset: Number) {
    this.offset = offset;
    console.log('offset:', offset);
    this.getAssetReading();
  }

  public getAsset(): void {
    this.assets = [];
    this.assetService.getAsset().
      subscribe(
      data => {
        if (data.error) {
          console.log('error in response', data.error);
          this.alertService.error(data.error.message);
          return;
        }
        this.assets = data;
        console.log('This is the asset data ',  this.assets);
      },
      error => { console.log('error', error); });
  }

  public getAssetReading(): void {
    console.log('Asset code: ', this.assetCode);
    console.log('Limit: ', this.limit);
    console.log('offset: ', this.offset);
    
    this.assetsReadingsData = [];
    if (this.assetCode.toLowerCase() === 'select') {
      return;
    }
    this.assetService.getAssetReadings(encodeURIComponent(this.assetCode), this.limit, this.offset).
      subscribe(
      data => {
        if (data.error) {
          console.log('error in response', data.error);
          this.alertService.error(data.error.message);
          return;
        }
        this.assetsReadingsData = [{
          asset_code: this.assetCode,
          data: data
        }];
        console.log('This is the asset reading data ',  this.assetsReadingsData);
      },
      error => { console.log('error', error); });
  }
}
