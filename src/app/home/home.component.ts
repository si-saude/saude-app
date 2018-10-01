import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component( {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css', './../../assets/css/list-component.css']
} )
export class HomeComponent {

    constructor() {
    }
    
    ngOnInit() {
        if ( $( ".container" ).get( 0 ).style.width == "100%" )
            window.location.reload();
    }
    
    ngOnDestroy() {
        
    }
    
}
