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
  // public ping_data = {};
  // public ping_info = { is_alive: false, service_status: 'service down' };
  constructor(private servicesHealthService: ServicesHealthService) { }

  ngOnInit() {
    this.getServiceData();
  }

  public getServiceData() {
    this.servicesHealthService.getServicesData()
      .subscribe(
      (data) => {
        console.log('Service Status', data.services);
        this.service_data = data.services;
      },
      (error) => {
        console.log('error: ', error);
      }
      );
  }

  // TODO: FOGL-516
  checkServiceHealth(port) {
    console.log('Port:', port);
    /*
    const service = this.service_data.filter(service => service.management_port == port);

    if (service[0].address === 'localhost') {
      service[0].address = environment.BASE_URL.substring(environment.BASE_URL.indexOf('/') + 2, environment.BASE_URL.lastIndexOf(':'));
    }

    const URL = service[0].protocol + '://' + service[0].address + ':' + service[0].management_port + '/';
    this.servicesHealthService.checkServiceHealth(URL)
      .subscribe(
      (data) => {
        this.ping_data = data;
        this.ping_info = { is_alive: true, service_status: 'running...' };
      },
      (error) => {
        console.log('error: ', error);
        this.ping_info = { is_alive: false, service_status: 'service down' };
      },
      () => console.log(this.ping_info)
    );
    */
  }
}
