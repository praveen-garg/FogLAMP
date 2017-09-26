import { Component, OnInit } from '@angular/core';
import { AssetsService, AlertService } from '../services/index';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  assets = [];
  assetsReadingsData = [];
  constructor(private assetService: AssetsService, private alertService: AlertService) { }

  ngOnInit() {
    this.getAsset();
  }

  public getAsset(): void {
    this.assets = [];
    this.assetService.getAsset().
      subscribe(
      data => {
        if (data.error) {
          this.alertService.error(data.error.message)
          return;
        }
        this.assets = data;
        console.log("This is the asset data ", this.assets);
      },
      error => { console.log("error", error) });
  }

  public getAssetReading(asset_code): void {
    console.log("This is the asset code ", asset_code);
    this.assetsReadingsData = [];
    if (asset_code.toLowerCase() === 'select') {
      return;
    }
    this.assetService.getAssetReadings(encodeURIComponent(asset_code)).
      subscribe(
      data => {
        if (data.error) {
          this.alertService.error(data.error.message)
          return;
        }
        this.assetsReadingsData = [{
          asset_code: asset_code,
          data: data
        }]
        console.log("This is the asset reading data ", this.assetsReadingsData);
      },
      error => { console.log("error", error) });
  }
}
