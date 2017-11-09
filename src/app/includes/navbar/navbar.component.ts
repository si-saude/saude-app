import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { GlobalVariable } from './../../global';

@Component( {
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
} )
export class NavbarComponent implements OnInit {

    private theme: string = GlobalVariable.THEME_API;
    private route: string;

    constructor( private router: Router, private location: Location ) { }

    ngOnInit() {
        
        this.router.events.subscribe( val => {
            this.route = this.location.prepareExternalUrl(this.location.path());
        } )
    }
    


}
