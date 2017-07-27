import { Component, OnInit } from '@angular/core';

import {ChartDataHelper} from "../../app/chart/chart-data-helper";
import { ConfigurationService } from '../services/index';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  congfigurationData = [];
  type:string;
  data:any;
  options:any;

  type1:string;
  data1:any;
  options1:any;
  constructor(public dataHelper: ChartDataHelper, private configService: ConfigurationService) { 
    this.type = dataHelper.type;
    this.data = dataHelper.data;
    this.options = dataHelper.options;

    this.type1 = dataHelper.type1;
    this.data1 = dataHelper.data1;
    this.options1 = dataHelper.options1;
  }

  ngOnInit() {
    this.getCategories();
  }


   getCategories() {
    this.configService.getCategories().
    subscribe(
      data => {
        this.congfigurationData = data.categories;
        console.log("This is the final ",  this.congfigurationData);
      },
      error => {
          
      });
    }
}
