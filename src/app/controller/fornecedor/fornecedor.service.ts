import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { FornecedorFilter } from './fornecedor.filter';
import { GenericService } from './../../generics/generic.service';
import { CidadeService } from './../cidade/cidade.service';

@Injectable()
export class FornecedorService extends GenericService {
    
    constructor( http: Http, router: Router,
            private cidadeService: CidadeService) { 
        super( http, router, "fornecedor" );
    }
    
    getTiposPessoa() {
        let urlGet = GlobalVariable.BASE_API_URL + "/generic/tipo-pessoa";
        return this.http
            .get( urlGet + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getCidades() {
        return this.cidadeService.getCidades();
    }
    
}