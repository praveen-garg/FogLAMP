import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { ChartDataHelper } from "../../app/chart/chart-data-helper";
import { ConfigurationService, StatisticsService } from '../services/index';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  congfigurationData = [];
  categoryData = [];
  statisticsData = [];
  type: string;
  data: any;
  options: any;

  type1: string;
  data1: any;
  options1: any;
  constructor(public dataHelper: ChartDataHelper,
    private configService: ConfigurationService,
    private statisticsService: StatisticsService,
    private router: Router) {
    this.type = "line"
    this.data = [];
    this.options = [];

    this.type1 = dataHelper.type1;
    this.data1 = dataHelper.data1;
    this.options1 = dataHelper.options1;
  }

  ngOnInit() {
    this.getCategories();
    this.getStatistics();
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

  public getStatistics(): void {
    var labels = [];
    var values = [];
    this.statisticsService.getStatistics().
      subscribe(data => {
        this.statisticsData = data;
        console.log("This is the statisticsData ", data);
        for (var key in data) {
          values.push(data[key]);
          labels.push(key);
          this.statisticsGraph(labels, values);
        }
      },
      error => { console.log("error", error) });
  }

  statisticsGraph(labels, data): void {
    console.log("Labels", labels, " data", data);
      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'Latest',
            data: data,
            backgroundColor: "rgb(176,196,222)"
          }
        ]
      };
    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      }
    }
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
