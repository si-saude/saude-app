import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Profissional } from './../../model/profissional';
import { ProfissionalSaudeFilter } from './profissional-saude.filter';
import { LocalizacaoService } from './../localizacao/localizacao.service';
import { CargoService } from './../cargo/cargo.service';
import { EquipeService } from './../equipe/equipe.service';
import { CursoService } from './../curso/curso.service';
import { CidadeService } from './../cidade/cidade.service';
import { VacinaService } from './../vacina/vacina.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class ProfissionalSaudeService extends GenericService {

    constructor( http: Http, router: Router, 
            private localizacaoService: LocalizacaoService,
            private cargoService: CargoService,
            private equipeService: EquipeService,
            private cursoService: CursoService,
            private cidadeService: CidadeService,
            private vacinaService: VacinaService) { 
        super(http, router, "profissional");
    }

    getLocalizacoes() {
        return this.localizacaoService.getLocalizacoes();
    }
    
    getCargos() {
        return this.cargoService.getCargos();
    }
    
    getEquipe() {
        return this.equipeService.getEquipes();
    }
    
    getCursos() {
        return this.cursoService.getCursos();
    }
    
    getCidades() {
        return this.cidadeService.getCidades();
    }
    
    getVacinas() {
        return this.vacinaService.getVacinas();
    }
    
}