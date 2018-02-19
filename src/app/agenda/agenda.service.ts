import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

//import { Tarefa } from './../model/tarefa';
//import { TarefaFilter } from './../controller/tarefa.filter';
import { UsuarioService } from './../controller/usuario/usuario.service';
import { EquipeService } from './../controller/equipe/equipe.service';
import { ProfissionalSaudeService } from './../controller/profissional-saude/profissional-saude.service';
import { GenericService } from './../generics/generic.service';

@Injectable()
export class AgendaService extends GenericService {

    constructor( http: Http, router: Router,
            private usuarioService: UsuarioService,
            private profissionalSaudeService: ProfissionalSaudeService,
            private equipeService: EquipeService) { 
        super( http, router, "tarefa" );
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
    
}