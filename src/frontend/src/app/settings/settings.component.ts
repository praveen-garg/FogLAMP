import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router) { }

  ngOnInit() { }

  public resetEndPoint() {
    const protocolField = <HTMLSelectElement>document.getElementById('protocol');
    const ipField = <HTMLInputElement>document.getElementById('ip');
    const portField = <HTMLInputElement>document.getElementById('port');
    const ip_address = protocolField.value + '://' + ipField.value + ':' + portField.value + '/foglamp/';
    localStorage.setItem('API_END_POINT', ip_address);
    console.log('End Point', localStorage.getItem('API_END_POINT'));
    this.router.navigate(['']);
    window.location.reload();
    this.toggle.emit();
  }
}
