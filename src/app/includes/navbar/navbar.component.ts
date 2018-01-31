import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './../../login/auth.service';

import { GlobalVariable } from './../../global';

@Component( {
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
} )
export class NavbarComponent {
    private theme: string = GlobalVariable.THEME_API;
    private route: string;
    private logged: boolean;

    constructor( private router: Router, private location: Location,
            private authService: AuthService) {
        this.logged = false;
    }

    ngOnInit() {
        this.router.events.subscribe( val => {
            this.route = this.location.prepareExternalUrl(this.location.path());
        } )
    }
    
    ngDoCheck() {
        if ( localStorage.getItem("token") != undefined && 
                localStorage.getItem("token") != null &&
                localStorage.getItem("token") != '' ) {
            this.logged = true;
        } else this.logged = false;
    }
    
    logoff() {
        localStorage.clear();
        this.router.navigate(['login']);
    }
    
    login() {
        this.router.navigate(['login']);
    }

}
