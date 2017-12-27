import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { PessoaFilter } from './pessoa.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class PessoaService extends GenericService {

    constructor( http: Http, router: Router) { 
        super(http, router, "pessoa");
    }
   
    getPessoas() {
        return this.selectList(new PessoaFilter());  
    }
        
    getPessoasByNome(nome) {
        let pessoaFilter = new PessoaFilter();
        pessoaFilter.setNome(nome);
        
        return this.selectList(pessoaFilter);
    }
}