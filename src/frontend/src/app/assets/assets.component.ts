import { Component, OnInit } from '@angular/core';
import { AssetsService, AlertService } from '../services/index';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  selectedAsset: Object;
  asset: Object;
  limit: number = 0;
  offset: number = 0;

  loading = false;
  total = 0;
  page = 1;
  paginationLimit: number = 20;
  recordCount: number = 0;

  assets = [];
  assetsReadingsData = [];

  constructor(private assetService: AssetsService, private alertService: AlertService) { }

  ngOnInit() {
    this.getAsset();
  }

  goToPage(n: number): void {
    this.page = n;
    if (this.limit !== 0) {
      this.paginationLimit = this.limit;
    } else {
      this.limit = this.paginationLimit;
    }
    this.offset = ((this.page) - 1) * this.paginationLimit;
    console.log('page: ', this.page);
    console.log('LIMIT: ', this.limit);
    console.log('OFFSET: ', this.offset);
    this.getAssetReading();
  }

  onNext(): void {
    this.page++;
    if (this.limit !== 0) {
      this.paginationLimit = this.limit;
    } else {
      this.limit = this.paginationLimit;
    }
    this.offset = ((this.page) - 1) * this.paginationLimit;
    console.log('LIMIT: ', this.limit);
    console.log('OFFSET: ', this.offset);
    this.getAssetReading();
  }

  onPrev(): void {
    this.page--;
    if (this.limit !== 0) {
      this.paginationLimit = this.limit;
    } else {
      this.limit = this.paginationLimit;
    }
    this.offset = ((this.page) - 1) * this.paginationLimit;
    console.log('limit: ', this.limit);
    console.log('OFFSET: ', this.offset);
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
    this.limit = limit;
    console.log('Limit: ', limit);
    this.getAssetReading();
  }

  public setOffset(offset: number) {
    this.offset = offset;
    this.recordCount = this.asset['count'] - this.offset;
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
    if (this.offset === 0) {
      this.recordCount = this.asset['count'];
    }
    console.log('Asset code: ', this.asset['asset_code']);
    console.log('Limit: ', this.limit);
    console.log('offset: ', this.offset);
    console.log('recordCount: ', this.recordCount);
    
    // TODO: Set 'Select' as default selected option.
    this.assetsReadingsData = [];
    if (this.asset['asset_code'].toLowerCase() === 'select') {
      return;
    }
    this.assetService.getAssetReadings(encodeURIComponent(this.asset['asset_code']), this.limit, this.offset).
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
