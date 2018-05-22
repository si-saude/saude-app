import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { PossivelDanoSaude } from './../../model/possivel-dano-saude';
import { PossivelDanoSaudeFilter } from './possivel-dano-saude.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class PossivelDanoSaudeService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"possivel-dano-saude");
    }
    
    getPossivelDanoSaudes() {
        return this.selectList(new PossivelDanoSaudeFilter());
    }    
}