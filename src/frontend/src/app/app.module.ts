import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './guards/index';
import { AlertComponent } from './directives/index';
import { AlertService, AuthService, ConfigurationService, 
  StatisticsService, AssetsService } from './services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { FooterComponent } from './footer/index';

import { KeysPipe } from './pipes/index';
import { NgzioGaugeComponentModule } from './ngzio-gauge/ngzio-gauge.module';
import { DashboardComponent } from './dashboard/index';
import { ConfigurationManagerComponent } from '../app/configuration-manager/index';

import { ChartModule } from './chart/index';
import { ScheduledProcessComponent } from '../app/scheduled-process/index';
import { SideMenuComponent } from '../app/side-menu/side-menu.component';
import { NavbarComponent } from '../app/navbar/navbar.component';
import { AssetsComponent } from '../app/assets/assets.component';
import { AuditLogComponent } from '../app/audit-log/audit-log.component';


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
    DashboardComponent,
    ConfigurationManagerComponent,
    ScheduledProcessComponent,
    SideMenuComponent,
    NavbarComponent,
    AssetsComponent,
    AuditLogComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthService,
    ConfigurationService,
    StatisticsService,
    AssetsService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
