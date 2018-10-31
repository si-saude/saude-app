import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Criterio } from './../../model/criterio';
import { CriterioFilter } from './criterio.filter';
import { CargoService } from './../cargo/cargo.service';
import { EnfaseService } from './../enfase/enfase.service';
import { GheeService } from './../ghee/ghee.service';
import { PeriodicidadeService } from './../periodicidade/periodicidade.service';
import { GenericService } from './../../generics/generic.service';
import { GlobalVariable } from './../../global';

@Injectable()
export class CriterioService extends GenericService {

    constructor( http: Http, router: Router,
            private enfaseService: EnfaseService,
            private periodicidadeService: PeriodicidadeService,
            private cargoService: CargoService,
            private gheeService: GheeService) { 
        super(http,router,"criterio");
    }
    
    getTipos() {
        let urlTipos = GlobalVariable.BASE_API_URL + "/generic/tipo-criterio";
        return this.http
            .get( urlTipos + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getSexos() {
        let urlTipos = GlobalVariable.BASE_API_URL + "/generic/sexo";
        return this.http
            .get( urlTipos + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getOperadores() {
        let urlOperadores = GlobalVariable.BASE_API_URL + "/generic/operador";
        return this.http
            .get( urlOperadores + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getCriterios() {
        return this.selectList(new CriterioFilter());
    }
    
    getEnfases() {
        return this.enfaseService.getEnfases();
    }
    
    getCargos() {
        return this.cargoService.getCargos();
    }
    
    getGhees() {
        return this.gheeService.getGhees();
    }
    
    getPeriodicidades() {
        return this.periodicidadeService.getPeriodicidades();
    }
    
}