import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Cat } from './../../model/cat';
import { CatFilter } from './cat.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class CatService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"cat");
    }
    
    getCats() {
        return this.selectList(new CatFilter());
    }
    
}