import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../global';

@Component( {
    selector: 'app-navbar-principal',
    templateUrl: './navbar-principal.component.html',
    styleUrls: ['./navbar-principal.component.css']
} )
export class NavbarPrincipalComponent implements OnInit {

    private theme: string = GlobalVariable.THEME_API;

    constructor( private router: Router ) { }

    ngOnInit() {
    }

    logout() {
        
    }

}