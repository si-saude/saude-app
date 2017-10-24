import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Base } from './../../model/base';
import { BaseFilter } from './base.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class BaseService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"base");
    }
    
    getBases() {
        return this.selectList(new BaseFilter());
    }
    
}