import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { AssetsService } from '../../services/assets.service';
import ReadingsValidator from '../assets/readings-validator';
import { AssetSummaryService } from './../asset-summary/asset-summary-service';

@Component({
  selector: 'app-asset-summary',
  templateUrl: './asset-summary.component.html',
  styleUrls: ['./asset-summary.component.css']
})
export class AssetSummaryComponent implements OnInit {
  assetReadingSummary: any = [];
  assetCode: String = '';
  isValidData = false;

  constructor(private assetService: AssetsService, private assetSummaryService: AssetSummaryService) { }

  ngOnInit() { }

  public toggleModal(shouldOpen: Boolean) {
    const summary_modal = <HTMLDivElement>document.getElementById('summary_modal');
    if (shouldOpen) {
      summary_modal.classList.add('is-active');
      return;
    }
    summary_modal.classList.remove('is-active');
  }

  public getReadingSummary(assetCode) {
    this.assetCode = assetCode;
    this.isValidData = true;
    this.assetService.getAssetReadings(encodeURIComponent(assetCode)).
      subscribe(
      data => {
        if (data.error) {
          console.log('error in response', data.error);
          return;
        }
        const validRecord = ReadingsValidator.validateReadings(data);
        if (validRecord) {
          this.assetSummaryService.getReadingSummary(assetCode, data[0]);
          this.assetSummaryService.assetReadingSummary.subscribe(
            value => {
              this.assetReadingSummary = value;
            });
        } else {
          this.isValidData = false;
          console.log('No valid data to show trends.');
        }
      },
      error => { console.log('error', error); });
  }
}

