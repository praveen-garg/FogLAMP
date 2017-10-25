import { Component, OnInit } from '@angular/core';
import { AssetsService, AlertService } from '../services/index';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  selectedAsset: Object = 'Select'
  asset: Object;
  limit: number = 20;
  offset: number = 0;

  page = 1;
  recordCount: number = 0;
  tempOffset: number = 0
  assets = [];
  assetsReadingsData = [];

  constructor(private assetService: AssetsService, private alertService: AlertService) { }

  ngOnInit() {
    this.getAsset();
  }

  goToPage(n: number): void {
    this.page = n;
    this.setLimitOffset();
  }

  onNext(): void {
    this.page++;
    this.setLimitOffset();
  }

  onPrev(): void {
    this.page--;
    this.setLimitOffset();
  }

  setLimitOffset() {
    if (this.limit === 0) {
      this.limit = 20;
    }
    if (this.offset > 0) {
      this.tempOffset = (((this.page) - 1) * this.limit) + this.offset;
    } else {
      this.tempOffset = ((this.page) - 1) * this.limit;
    }
    console.log('limit: ', this.limit);
    console.log('offset: ', this.offset);
    console.log('temp offset: ', this.tempOffset);
    this.getAssetReading();
  }

  public setAssetCode(assetData) {
    this.asset = assetData;
    if (this.offset !== 0) {
      this.recordCount = this.asset['count'] - this.offset;
    }
    console.log('asset: ', assetData);
    this.getAssetReading();
  }
  public setLimit(limit: number) {
    if (this.page !== 1) {
      this.page = 1;
      this.tempOffset = this.offset;
    }
    if (limit === null || limit === 0) {
      this.limit = 20;
    } else {
      this.limit = limit;
    }
    console.log('Limit: ', limit);
    this.getAssetReading();
  }

  public setOffset(offset: number) {
    if (this.page !== 1) {
      this.page = 1;
      this.tempOffset = this.offset;
    } else {
      this.offset = offset;
    }
    this.recordCount = this.asset['count'] - this.offset;
    this.setLimitOffset();
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
    if (this.offset === 0) {
      this.recordCount = this.asset['count'];
    }
    console.log('Asset code: ', this.asset['asset_code']);
    console.log('Limit: ', this.limit);
    console.log('offset: ', this.offset);
    console.log('tempOffset: ', this.tempOffset); 
    console.log('recordCount: ', this.recordCount);
    
    this.assetsReadingsData = [];
    if (this.asset['asset_code'].toLowerCase() === 'select') {
      return;
    }
    this.assetService.getAssetReadings(encodeURIComponent(this.asset['asset_code']), this.limit, this.tempOffset).
      subscribe(
      data => {
        if (data.error) {
          console.log('error in response', data.error);
          this.alertService.error(data.error.message);
          return;
        }
        this.assetsReadingsData = [{
          asset_code: this.asset['asset_code'],
          count: this.recordCount,
          data: data
        }];
        console.log('This is the asset reading data ',  this.assetsReadingsData);
      },
      error => { console.log('error', error); });
  }
}
