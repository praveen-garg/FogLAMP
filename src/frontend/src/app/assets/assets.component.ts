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
  limit: Number = 0;
  offset: Number = 0;

  loading = false;
  total = 0;
  page = 1;
  paginationLimit = 20;
  
  assets = [];
  assetsReadingsData = [];

  constructor(private assetService: AssetsService, private alertService: AlertService) { }

  ngOnInit() {
    this.getAsset();
  }

  goToPage(n: number): void {
    this.page = n;
    this.limit = this.paginationLimit;
    this.offset = ((this.page) - 1) * 20;
    console.log('page: ', this.page);
    console.log('LIMIT: ', this.limit);
    console.log('OFFSET: ', this.offset);
    this.getAssetReading();
  }

  onNext(): void {
    this.page++;
    this.limit = this.paginationLimit;
    this.offset = ((this.page) - 1) * 20;
    console.log('LIMIT: ', this.limit);
    console.log('OFFSET: ', this.offset);
    this.getAssetReading();
  }

  onPrev(): void {
    this.page--;
    console.log('onPrev: ', 'onPrev1');
    this.limit = this.paginationLimit;
    this.offset = ((this.page) - 1) * 20;
    console.log('limit: ', this.limit);
    console.log('OFFSET: ', this.offset);
    this.getAssetReading();
  }

  public setAssetCode(assetData) {
    this.asset = assetData;
    console.log('asset: ', assetData);
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
    console.log('Asset code: ', this.asset['asset_code']);
    console.log('Limit: ', this.limit);
    console.log('offset: ', this.offset);
    
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
          count: this.asset['count'],
          data: data
        }];
        console.log('This is the asset reading data ',  this.assetsReadingsData);
      },
      error => { console.log('error', error); });
  }
}
