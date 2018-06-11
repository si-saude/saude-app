import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { UsuarioFilter } from './usuario.filter';
import { GenericService } from './../../generics/generic.service';
import { PerfilService } from './../perfil/perfil.service';
import { PessoaService } from './../pessoa/pessoa.service';

@Injectable()
export class UsuarioService extends GenericService {

    constructor( http: Http, router: Router,
            private perfilService: PerfilService,
            private pessoaService: PessoaService) { 
        super(http, router, "usuario");
    }
   
    getUsuarios() {
        return this.selectList(new UsuarioFilter());
    }
    
    getPessoas() {
        return this.pessoaService.getPessoas();
    }
    
    getPessoasByNome( nome ) {
        return this.pessoaService.getPessoasByNome( nome );
    }
    
    getPerfis() {
        return this.perfilService.getPerfis();
    }
    
    getPessoaService() {
        return this.pessoaService;
    }
    
}