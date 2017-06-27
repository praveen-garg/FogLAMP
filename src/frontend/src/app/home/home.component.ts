import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/index';
import { Observable } from 'rxjs/Rx';


@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html',
})

export class HomeComponent {
    private currentUser: String
    private timer:any = ''
    private xdata:{} = {}
    private errorMessage:any = ''
   
    constructor(private router: Router, private authService: AuthService) {
        this.currentUser = sessionStorage.getItem('currentUser');
    }
    
    /**
     *  Signout the current user
     */
     logOut() {
        // remove access token and logged in user from session storage
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
    
    startCollecting(){
        console.log("Collecting ...")
        let theToken = sessionStorage.getItem('access_token')
        this.authService.getData(theToken)
        .subscribe(
            (data) => { this.xdata = data; },
            (error) => { this.errorMessage = <any>error },
            () => console.log(this.xdata)
        );
        console.log(this.xdata)
    }
    start(){
        clearInterval(this.timer)
        this.timer = setInterval(function () {
            this.startCollecting()
        }.bind(this), 2000);  
    }
    stop(){
        clearInterval(this.timer)
    }

    ngOnDestroy() {
      clearInterval(this.timer)
    }
}
