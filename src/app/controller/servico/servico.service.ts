import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Servico } from './../../model/servico';
import { ServicoFilter } from './servico.filter';
import { EquipeService } from './../equipe/equipe.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class ServicoService extends GenericService {

    constructor( http: Http, router: Router,
            private equipeService: EquipeService) { 
        super(http,router,"servico");
    }
    
    getServicos() {
        return this.selectList(new ServicoFilter());
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
    
}