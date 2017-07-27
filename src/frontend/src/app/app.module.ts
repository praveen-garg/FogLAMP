import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './guards/index';
import { AlertComponent } from './directives/index';
import { AlertService, AuthService, ConfigurationService } from './services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { FooterComponent } from './footer/index';

import { KeysPipe } from './pipes/keys';
import { NgzioGaugeComponentModule } from './ngzio-gauge/ngzio-gauge.module';
import { DashboardComponent } from './dashboard/index';

import { ChartModule } from './chart/index';
import {ChartDataHelper} from "../app/chart/chart-data-helper";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NgzioGaugeComponentModule,
    ChartModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
    FooterComponent,
    KeysPipe,
    DashboardComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthService,
    ConfigurationService,
    ChartDataHelper
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
