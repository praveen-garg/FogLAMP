import { Component, OnInit } from '@angular/core';
import { ServicesHealthService } from '../services/index';
import { POLLING_INTERVAL } from '../utils';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-services-health',
  templateUrl: './services-health.component.html',
  styleUrls: ['./services-health.component.css']
})
export class ServicesHealthComponent implements OnInit {
  public timer: any = '';
  public service_data;
  constructor(private servicesHealthService: ServicesHealthService) { }

  ngOnInit() {
    this.getServiceData();
  }

  public getServiceData() {
    this.servicesHealthService.getAllServices()
      .subscribe(
      (data) => {
        this.service_data = data.services;
      },
      (error) => {
        console.log('error: ', error);
      });
  }
}
