import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { UsuarioService } from './../usuario/usuario.service';
import { ProfissionalSaudeService } from './../profissional-saude/profissional-saude.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class FichaColetaService extends GenericService {

    constructor( http: Http, router: Router,
            private usuarioService: UsuarioService,
            private profissionalService: ProfissionalSaudeService) { 
        super(http,router,"ficha-coleta");
    }
    
    getUsuario(id) {
        return this.usuarioService.get(id);
    }
    
    getProfissional(profissionalFilter) {
        return this.profissionalService.list(profissionalFilter);
    }
}