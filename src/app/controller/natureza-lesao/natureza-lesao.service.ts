import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from '../../global';
import { NaturezaLesao } from './../../model/natureza-lesao';
import { NaturezaLesaoFilter } from './natureza-lesao.filter';
import { GenericService } from '../../generics/generic.service';

@Injectable()
export class NaturezaLesaoService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"natureza-lesao");
    }
    
    getNaturezaLesaos() {
        return this.selectList(new NaturezaLesaoFilter());
    }
    
}