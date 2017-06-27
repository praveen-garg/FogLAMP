import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './guards/index';
import { AlertComponent } from './directives/index';
import { AlertService, AuthService } from './services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { FooterComponent } from './footer/index';

import { KeysPipe } from './pipes/keys';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
    FooterComponent,
    KeysPipe
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
