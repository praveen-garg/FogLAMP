import { Component, OnInit } from '@angular/core';

import { ConfigurationService } from '../services/index';

import { Utils } from '../services/utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public timer: any = ''
  public ping_data: {} = {}
  public error_message: any = ''
  public isAlive: boolean = true
  public service_status: string

  constructor(private configService: ConfigurationService) { }
  ngOnInit() {
    this.start();
  }

  pingService() {
    console.log("pingService ...")
    this.configService.pingService()
      .subscribe(
      (data) => { 
        this.ping_data = data
        this.isAlive = true
        this.service_status = "Running"
       },
      (error) => {
        this.error_message = <any>error
        this.isAlive = false
        this.service_status = "service down"
      },
      () => console.log(this.ping_data)
      );
  }
  start() {
    clearInterval(this.timer)
    this.timer = setInterval(function () {
      this.pingService()
    }.bind(this), Utils.POLLING_INTERVAL);
  }
  stop() {
    clearInterval(this.timer)
  }

  ngOnDestroy() {
    clearInterval(this.timer)
  }

}
