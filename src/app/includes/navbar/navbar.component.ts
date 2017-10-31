import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../global';

@Component( {
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
} )
export class NavbarComponent implements OnInit {

    private theme: string = GlobalVariable.THEME_API;
    private route: string;

    constructor( private router: Router ) { }

    ngOnInit() {
        this.router.events.subscribe( val => {
            this.route = val.url;
        } )
    }


}
