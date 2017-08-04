import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { DashboardComponent } from './dashboard/index';
import { ConfigurationManagerComponent } from './configuration-manager/index';
import { ScheduledProcessComponent } from './scheduled-process/index'
import { AssetsComponent } from './assets/index'
import { AuditLogComponent } from './audit-log/index';


const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: '', component: DashboardComponent },
    { path: 'configuration', component: ConfigurationManagerComponent },
    { path: 'scheduled-tasks', component: ScheduledProcessComponent },
    { path: 'assets', component: AssetsComponent },
    { path: 'audit-logs', component: AuditLogComponent },
    
    // otherwise redirect to home
    { path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);