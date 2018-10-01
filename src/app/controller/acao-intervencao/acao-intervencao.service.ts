import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from '../../global';
import { AcaoIntervencao } from '../../model/acao-intervencao';
import { AcaoIntervencaoFilter } from '../acao-intervencao/acao-intervencao.filter';
import { GenericService } from '../../generics/generic.service';
import { EquipeService } from './../equipe/equipe.service';

@Injectable()
export class AcaoIntervencaoService extends GenericService {

    constructor( http: Http, router: Router,
                 private equipeService: EquipeService) { 
        super(http,router,"acao-intervencao");
    }
    
    getAcaoIntervencoes() {
        return this.selectList(new AcaoIntervencaoFilter());
    }
    
    getEquipeService(){
        return this.equipeService;        
    }
}