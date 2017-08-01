import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { DashboardComponent } from './dashboard/index';
import { ConfigurationManagerComponent } from './configuration-manager/index';
import { ScheduledProcessComponent} from './scheduled-process/index'


const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: '', component: DashboardComponent },
    { path: 'configuration', component: ConfigurationManagerComponent },
    { path: 'schedule-tasks', component: ScheduledProcessComponent },
    
    // otherwise redirect to home
    { path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);