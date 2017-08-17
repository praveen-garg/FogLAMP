import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigurationService, StatisticsService } from '../services/index';
import Utils from '../services/utils'
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

  readingChart: string;
  readingValues: any;

  purgeChart: string;
  purgedValues: any;

  sentChart: string;
  sentValues: any;

  constructor(private configService: ConfigurationService,
    private statisticsService: StatisticsService,
    private router: Router) {

    this.readingChart = "line";
    this.readingValues = [];

    this.purgeChart = "line";
    this.purgedValues = [];

    this.sentChart = "line";
    this.sentValues = [];
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
        this.congfigurationData.forEach(element => {
          this.getCategory(element.key);
        });
      },
      error => { console.log("error", error) });
  }

  public getCategory(category_name: string): void {

    this.configService.getCategory(category_name).
      subscribe(
      data => {
        this.categoryData[category_name.trim()] = data
        console.log("This is the categoryData ", this.categoryData);
      },
      error => { console.log("error", error) });

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
      },
      error => { console.log("error", error) });
  }

  public getStatisticsHistory(): void {
    var readingsValues = []
    var readingsLabels = []

    var purgedValues = []
    var purgedLabels = []

    var sentValues = []
    var sentLabels = []

    this.statisticsService.getStatisticsHistory().
      subscribe(data => {
        this.statHistoryData = data.statistics;
        this.statHistoryData.forEach(element => {
          Object.keys(element).forEach(aKey => {
            if (aKey.indexOf("READINGS") !== -1) {
              readingsValues.push(element[aKey])
              var tempDt = element['history_ts'];
              console.log("This is the recieved", tempDt);
              readingsLabels.push(Utils.formateDate(tempDt))
              console.log("This is the formatted", Utils.formateDate(tempDt));
            }
            if (aKey.indexOf("PURGED") !== -1 && aKey.indexOf("UNSNPURGED") == -1) {
              purgedValues.push(element[aKey])
              var tempDt = element['history_ts'];
              console.log("This is the recieved", tempDt);
              purgedLabels.push(Utils.formateDate(tempDt))
              console.log("This is the formatted", Utils.formateDate(tempDt));
            }
            if (aKey.indexOf("SENT") !== -1 && aKey.indexOf("UNSENT") == -1) {
              sentValues.push(element[aKey])
              var tempDt = element['history_ts'];
              console.log("This is the recieved", tempDt);
              sentLabels.push(Utils.formateDate(tempDt))
              console.log("This is the formatted", Utils.formateDate(tempDt));
            }
          });
        });
        console.log("This is the history readings ", readingsValues);
        console.log("This is the stats history for purge: ", purgedValues);
        console.log("This is the history sent ", sentValues);
        this.statsHistoryReadingsGraph(readingsLabels, readingsValues);
        this.statsHistoryPurgedGraph(purgedLabels, purgedValues);
        this.statsHistorySentGraph(sentLabels, sentValues);
      },
      error => { console.log("error", error) });
  }

  statsHistoryReadingsGraph(labels, data): void {
    //var labels = Array.apply(null, Array(data.length)).map(function (_, i) {return i;});
    this.readingChart = "line"
    this.readingValues = {
      labels: labels,
      datasets: [
        {
          label: '',
          data: data,
          backgroundColor: "rgb(100,149,237)",
        }
      ]
    };
  }

  statsHistoryPurgedGraph(labels, data): void {
    //var labels = Array.apply(null, Array(data.length)).map(function (_, i) { return i; });
    this.purgeChart = "line"
    this.purgedValues = {
      labels: labels,
      datasets: [
        {
          label: '',
          data: data,
          backgroundColor: "rgb(255,165,0)"
        }
      ]
    };
  }

  statsHistorySentGraph(labels, data): void {
    //var labels = Array.apply(null, Array(data.length)).map(function (_, i) { return i; });
    this.sentChart = "line"
    this.sentValues = {
      labels: labels,
      datasets: [
        {
          label: '',
          data: data,
          backgroundColor: "rgb(144,238,144)"
        }
      ]
    };
  }

  public showModal(config_item_key) {
    console.log("show:", config_item_key)
    var el = document.getElementById(config_item_key);
    el.classList.add('is-active');
  }

  public closeModal(config_item_key) {
    console.log("close:", config_item_key)
    var el = document.getElementById(config_item_key);
    el.classList.remove('is-active');
  }

}
