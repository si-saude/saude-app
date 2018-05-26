import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Aprho } from './../../model/aprho';
import { AprhoFilter } from './aprho.filter';
import { GenericService } from './../../generics/generic.service';
import { GheService } from './../ghe/ghe.service';

@Injectable()
export class AprhoService extends GenericService {

    constructor( http: Http, router: Router,
                 private gheService: GheService) { 
        super(http,router,"aprho");
    }
    
    getAprhos() {
        return this.selectList(new AprhoFilter());
    }    
    
    getGhes() {
        return this.gheService.getGhes();
    }
   
}