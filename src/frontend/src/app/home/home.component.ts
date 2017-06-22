import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    currentUser: String;
    
    constructor(private router: Router) {
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
}