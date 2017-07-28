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
  statHistoryData = [];
  type: string;
  data: any;
  options: any;

  readingChart: string;
  readingValues: any;

  constructor(public dataHelper: ChartDataHelper,
    private configService: ConfigurationService,
    private statisticsService: StatisticsService,
    private router: Router) {
    this.type = "line"
    this.data = [];
    this.options = [];

    this.readingChart = "line";
    this.readingValues = [];
  }

  ngOnInit() {
    this.getCategories();
    this.getStatistics();
    this.getStatisticsHistory();
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
        }
        this.statisticsGraph(labels, values);
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

  public getStatisticsHistory(): void {
    var labels = [];
    var values = [];
    var readingsValue = []
    this.statisticsService.getStatisticsHistory().
      subscribe(data => {
        this.statHistoryData = data.statistics;
        this.statHistoryData.forEach(element => {
          Object.keys(element).forEach(aKey => {
            if (aKey.indexOf("READ") !== -1) {
              readingsValue.push(element[aKey])
            }
          });

        });
        console.log("This is the history readings ", readingsValue);
        this.historyRGraph([], readingsValue);
      },
      error => { console.log("error", error) });
  }

  historyRGraph(labels, data): void {
    this.readingChart = "line"
    this.readingValues = {
      labels: labels,
      datasets: [
        {
          label: 'delta',
          data: data,
          backgroundColor: "rgb(100,149,237)"
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
