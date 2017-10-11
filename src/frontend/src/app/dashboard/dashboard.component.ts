import { Component, OnInit } from '@angular/core';
import { StatisticsService, AlertService } from '../services/index';
import Utils from '../utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  statisticsData = [];
  statHistoryData = [];

  readingChart: string;
  readingValues: any;

  purgeChart: string;
  purgedValues: any;

  sentChart: string;
  sentValues: any;

  constructor(private statisticsService: StatisticsService, private alertService: AlertService) {

    this.readingChart = 'line';
    this.readingValues = [];

    this.purgeChart = 'line';
    this.purgedValues = [];

    this.sentChart = 'line';
    this.sentValues = [];
  }

  ngOnInit() {
    this.getStatistics();
    this.getStatisticsHistory();
  }

  public getStatistics(): void {
    this.statisticsService.getStatistics().
      subscribe(data => {
         if (data.error) {
          console.log('error in response', data.error);
          this.alertService.error(data.error.message);
          return;
        }
        console.log('This is the statisticsData ', data);
        this.statisticsData = data;
      },
      error => { console.log('error', error); });
  }

  public getStatisticsHistory(): void {
    let readingsValues = [];
    let readingsLabels = [];

    let purgedValues = [];
    let purgedLabels = [];

    let sentValues = [];
    let sentLabels = [];

    this.statisticsService.getStatisticsHistory().
      subscribe(data => {
         if (data.error) {
          console.log('error in response', data.error);
          this.alertService.error(data.error.message);
          return;
        }
        this.statHistoryData = data.statistics;
        console.log('Statistics History Data', data);
        this.statHistoryData.forEach(element => {
          Object.keys(element).forEach(aKey => {
            if (aKey.indexOf('READINGS') !== -1) {
              readingsValues.push(element[aKey]);
              let tempDt = element['history_ts'];
              readingsLabels.push(Utils.formateDate(tempDt));
            }
            if (aKey.indexOf('PURGED') !== -1 && aKey.indexOf('UNSNPURGED') === -1) {
              purgedValues.push(element[aKey]);
              let tempDt = element['history_ts'];
              purgedLabels.push(Utils.formateDate(tempDt));
            }
            if (aKey.indexOf('SENT_1') !== -1 && aKey.indexOf('UNSENT') === -1) {
              sentValues.push(element[aKey]);
              let tempDt = element['history_ts'];
              sentLabels.push(Utils.formateDate(tempDt));
            }
          });
        });
        this.statsHistoryReadingsGraph(readingsLabels, readingsValues);
        this.statsHistoryPurgedGraph(purgedLabels, purgedValues);
        this.statsHistorySentGraph(sentLabels, sentValues);
      },
      error => { console.log('error', error); });
  }

  statsHistoryReadingsGraph(labels, data): void {
    this.readingChart = 'line';
    this.readingValues = {
      labels: labels,
      datasets: [
        {
          label: '',
          data: data,
          backgroundColor: 'rgb(100,149,237)',
        }
      ]
    };
  }

  statsHistoryPurgedGraph(labels, data): void {
    this.purgeChart = 'line';
    this.purgedValues = {
      labels: labels,
      datasets: [
        {
          label: '',
          data: data,
          backgroundColor: 'rgb(255,165,0)'
        }
      ]
    };
  }

  statsHistorySentGraph(labels, data): void {
    this.sentChart = 'line';
    this.sentValues = {
      labels: labels,
      datasets: [
        {
          label: '',
          data: data,
          backgroundColor: 'rgb(144,238,144)'
        }
      ]
    };
  }
}