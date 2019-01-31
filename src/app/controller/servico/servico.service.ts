import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Servico } from './../../model/servico';
import { ServicoFilter } from './servico.filter';
import { EquipeService } from './../equipe/equipe.service';
import { RegraAtendimentoService } from './../regra-atendimento/regra-atendimento.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class ServicoService extends GenericService {

    constructor( http: Http, router: Router,
            private equipeService: EquipeService, 
            private regraAtendimentoService: RegraAtendimentoService) { 
        super(http,router,"servico");
    }
    
    getServicos() {
        return this.selectList(new ServicoFilter());
    }
    
    getServicosAtendimentoOcupacional() {
        let filter = new ServicoFilter()
        filter.setGrupo("ATENDIMENTO OCUPACIONAL");        
        return this.selectList(filter);
    }
    
    getEquipes() {
        return this.equipeService.getEquipes();
    }
    
    getGrupos() {
        let urlGrupo = GlobalVariable.BASE_API_URL + "/generic/grupo-servico";
        return this.http
            .get( urlGrupo + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getRegras() {
        return this.regraAtendimentoService.getRegras();
    }
    
}