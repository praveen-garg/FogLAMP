import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AuthGuard } from './guards/index';
import { AlertComponent } from './directives/index';
import { AlertService, AuthService, ConfigurationService,
  StatisticsService, AssetsService, AuditService, SchedulesService } from './services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { FooterComponent } from './footer/index';

import { KeysPipe, FilterPipe } from './pipes/index';
import { NgzioGaugeComponentModule } from './ngzio-gauge/ngzio-gauge.module';
import { DashboardComponent } from './dashboard/index';
import { ConfigurationManagerComponent } from '../app/configuration-manager/index';

import { ChartModule } from './chart/index';
import { ScheduledProcessComponent } from '../app/scheduled-process/index';
import { SideMenuComponent } from '../app/side-menu/side-menu.component';
import { NavbarComponent } from '../app/navbar/navbar.component';
import { AssetsComponent } from '../app/assets/assets.component';
import { AuditLogComponent } from '../app/audit-log/audit-log.component';
import { InputDebounceComponent } from '../app/input-debounce/input-debounce.component';

import {NgxMaskModule} from 'ngx-mask';
import { ModalComponent } from './modal/modal.component';
import { UpdateModalComponent } from './update-modal/update-modal.component'; 
import { SidebarModule } from 'ng-sidebar';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    NgzioGaugeComponentModule,
    ChartModule,
    NgxMaskModule,
    SidebarModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
    FooterComponent,
    KeysPipe,
    FilterPipe,
    DashboardComponent,
    ConfigurationManagerComponent,
    ScheduledProcessComponent,
    SideMenuComponent,
    NavbarComponent,
    AssetsComponent,
    AuditLogComponent,
    InputDebounceComponent,
    ModalComponent,
    UpdateModalComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthService,
    ConfigurationService,
    StatisticsService,
    AssetsService,
    AuditService,
    SchedulesService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
