import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from '../../global';
import { Empresa } from '../../model/empresa';
import { EmpresaFilter } from '../empresa/empresa.filter';
import { CidadeService } from './../cidade/cidade.service';
import { GenericService } from '../../generics/generic.service';

@Injectable()
export class EmpresaService extends GenericService {

    constructor( http: Http, router: Router,
            private cidadeService: CidadeService) { 
        super(http,router,"empresa");
    }
    
    getEmpresas() {
        return this.selectList(new EmpresaFilter());
    }
    
    getCidadeService() {
        return this.cidadeService;
    }
    
}