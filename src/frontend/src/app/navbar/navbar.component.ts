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
  public ping_info: {} = {}

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
        this.ping_info = { is_alive:true, service_status:"running..." }
       },
      (error) => {
        console.log("error: " , error)
        this.ping_info = { is_alive:false, service_status:"service down" }
      },
      () => console.log(this.ping_info)
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
