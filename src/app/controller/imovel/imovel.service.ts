import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Imovel } from './../../model/imovel';
import { ImovelFilter } from './imovel.filter';
import { BaseService } from './../base/base.service';

import { GenericService } from '../../generics/generic.service';

@Injectable()
export class ImovelService extends GenericService {

    constructor( http: Http, router: Router,
            private baseService: BaseService ) { 
        super(http,router,"imovel");
    }
    
    getImoveis() {
        return this.selectList(new ImovelFilter());
    }
    
    getBases() {
        return this.baseService.getBases();
    }
    
}