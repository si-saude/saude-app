import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { UsuarioService } from './../controller/usuario/usuario.service';
import { EquipeService } from './../controller/equipe/equipe.service';
import { ProfissionalSaudeService } from './../controller/profissional-saude/profissional-saude.service';
import { SolicitacaoCentralIntegraFilter } from './../controller/solicitacao-central-integra/solicitacao-central-integra.filter';
import { GenericService } from './../generics/generic.service';
import { GlobalVariable } from './../global';

//SUBSTITUIR POR SOLICITACAOCENTRALINTEGRASERVICE
@Injectable()
export class KanbanService extends GenericService {

    constructor( http: Http, router: Router,
            private usuarioService: UsuarioService,
            private profissionalSaudeService: ProfissionalSaudeService,
            private equipeService: EquipeService) { 
        super( http, router, "solicitacao-central-integra" );
    }
    
    getUsuario(id) {
        return this.usuarioService.get(id);
    }
    
    getProfissional( profissionalFilter ) {
        return this.profissionalSaudeService.list( profissionalFilter );
    }
    
    getEquipe( id ) {
        return this.equipeService.get(id);
    }
    
    getSolicitacoes(solicitacaoCentralIntegraFilter: SolicitacaoCentralIntegraFilter) {
        return this.list(solicitacaoCentralIntegraFilter);
    }
    
    getAnexo() {
        
    }
    
}