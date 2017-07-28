import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { ChartDataHelper } from "../../app/chart/chart-data-helper";
import { ConfigurationService } from '../services/index';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  congfigurationData = [];
  categoryData= []; 
  type: string;
  data: any;
  options: any;

  type1: string;
  data1: any;
  options1: any;
  constructor(public dataHelper: ChartDataHelper, 
  private configService: ConfigurationService,
  private router: Router) {
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

  public getCategories(): void {
    this.configService.getCategories().
      subscribe(
      data => {
        this.congfigurationData = data.categories;
        console.log("This is the congfigurationData ", this.congfigurationData);
        this.getCategory();
      },
      error => { console.log("error", error) });
  }

  public getCategory(): void {
    this.congfigurationData.forEach(element => {
      this.configService.getCategory(element.key).
        subscribe(
        data => {
          this.categoryData.push(data);
          console.log("This is the categoryData ", this.categoryData);
        },
        error => { console.log("error", error) });
    });
  }

public showModal(event) {
  var el = document.getElementById('cat-details');
  el.classList.add('is-active');
}

public closeModal(event) {
  var el = document.getElementById('cat-details');
  el.classList.remove('is-active');
}

}
