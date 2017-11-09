import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

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
import { EmpregadoService } from './../empregado/empregado.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class ProfissionalSaudeService extends GenericService {

    constructor( http: Http, router: Router, 
            private localizacaoService: LocalizacaoService,
            private cargoService: CargoService,
            private equipeService: EquipeService,
            private cursoService: CursoService,
            private cidadeService: CidadeService,
            private vacinaService: VacinaService,
            private empregadoService: EmpregadoService) { 
        super(http, router, "profissional");
    }

    getEmpregadoByName(nome: string) {
        return this.empregadoService.getEmpregadoByName(nome);
    }
    
    getEmpregadoByChave(chave: string) {
        return this.empregadoService.getEmpregadoByChave(chave);
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