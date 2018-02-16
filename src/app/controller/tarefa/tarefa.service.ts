import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Tarefa } from './../../model/tarefa';
import { TarefaFilter } from './tarefa.filter';
import { EquipeService } from './../equipe/equipe.service';
import { ServicoService } from './../servico/servico.service';
import { ProfissionalSaudeService } from './../profissional-saude/profissional-saude.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class TarefaService extends GenericService {

    constructor( http: Http, router: Router,
            private profissionalSaudeService: ProfissionalSaudeService, 
            private servicoService: ServicoService,
            private equipeService: EquipeService) { 
        super(http,router,"tarefa");
    }
    
    getTarefas() {
        return this.selectList(new TarefaFilter());
    }
    
    getServicos() {
        return this.servicoService.getServicos();
    }
    
    getEquipes() {
        return this.equipeService.getEquipes();
    }
    
    getStatusTarefa() {
        let urlGrupo = GlobalVariable.BASE_API_URL + "/generic/status-tarefa";
        return this.http
            .get( urlGrupo + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getProfissionalByName(nome: string) {
        return this.profissionalSaudeService.getEmpregadoByName( nome );
    }
    
    getProfissionalByChave(chave: string) {
        return this.profissionalSaudeService.getEmpregadoByChave( chave );
    }
    
}