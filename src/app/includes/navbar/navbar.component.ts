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
export class NavbarComponent implements OnInit {
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
        
        this.authService.logged.subscribe(logado => { 
            this.logged = logado
        });
    }
    
    logoff() {
        this.authService.logged.emit(false);
        localStorage.clear();
        this.router.navigate(['login']);
    }
    
    login() {
        this.router.navigate(['login']);
    }

}
