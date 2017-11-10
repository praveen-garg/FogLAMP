import { Component, OnInit } from '@angular/core';
import { ServicesHealthService } from '../services/index';
import { POLLING_INTERVAL } from '../utils';
import { environment } from '../../environments/environment';
import { AlertService } from './../services/alert.service';
import Utils from '../utils';

@Component({
  selector: 'app-services-health',
  templateUrl: './services-health.component.html',
  styleUrls: ['./services-health.component.css']
})
export class ServicesHealthComponent implements OnInit {
  public timer: any = '';
  public service_data;
  constructor(private servicesHealthService: ServicesHealthService, private alertService: AlertService) { }

  time: number;
  ngOnInit() {
    this.getServiceData();
  }

  public getServiceData() {
    this.servicesHealthService.getAllServices()
      .subscribe(
      (data) => {
        if (data.error) {
          console.log('error in response', data.error);
          this.alertService.warning('Could not connect to Core Managment API, ' +
            'Make sure to set correct <a href="/settings"> core management port </a>');
          return;
        }
        this.service_data = data.services;
        this.time = Utils.getCurrentDate();
      },
      (error) => {
        this.alertService.warning('Could not connect to Core Managment API, ' +
            'Make sure to set correct <a href="/settings"> core management port </a>');
        console.log('error: ', error);
      });
  }
}
