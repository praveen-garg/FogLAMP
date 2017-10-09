import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  endpoint = environment.BASE_URL.split(':');
  protocol = this.endpoint[0];
  host = this.endpoint[1].substr(2);
  port = this.endpoint[2].substring(0, this.endpoint[2].indexOf('/'));
  constructor(private router: Router) { }

  ngOnInit() {
    console.log("HOST", this.host);
    console.log("PORT", this.port);
    console.log("PROTOCOL", this.protocol);
    
  }

  public resetEndPoint() {
    const protocolField = <HTMLSelectElement>document.getElementById('protocol');
    const hostField = <HTMLInputElement>document.getElementById('host');
    const portField = <HTMLInputElement>document.getElementById('port');
    const endpoint = protocolField.value + '://' + hostField.value + ':' + portField.value + '/foglamp/';
    localStorage.setItem('API_END_POINT', endpoint);
    console.log('End Point', localStorage.getItem('API_END_POINT'));
    this.router.navigate(['']);
    window.location.reload();
    this.toggle.emit();
  }
}
