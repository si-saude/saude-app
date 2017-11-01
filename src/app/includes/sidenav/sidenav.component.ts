import { Component, OnInit, EventEmitter } from '@angular/core';

import { MaterializeAction } from "angular2-materialize";

@Component( {
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
} )
export class SidenavComponent implements OnInit {
    sidenavActions1 = new EventEmitter<any|MaterializeAction>();
    sidenavActions2 = new EventEmitter<any|MaterializeAction>();
    sidenavActions3 = new EventEmitter<any|MaterializeAction>();
    sidenavParams = [];
    
    constructor() { }

    ngOnInit() {
    }

    openSidenav1() {
        this.sidenavActions1.emit( { action: "sideNav", params: ['show'] } );
    }

    closeSidenav1() {
        this.sidenavActions1.emit( { action: "sideNav", params: ['hide'] } );
    }
    
    openSidenav2() {
        this.sidenavActions2.emit( { action: "sideNav", params: ['show'] } );
    }
    
    closeSidenav2() {
        this.sidenavActions2.emit( { action: "sideNav", params: ['hide'] } );
    }
    
    openSidenav3() {
        this.sidenavActions3.emit( { action: "sideNav", params: ['show'] } );
    }
    
    closeSidenav3() {
        this.sidenavActions3.emit( { action: "sideNav", params: ['hide'] } );
    }
    
}
