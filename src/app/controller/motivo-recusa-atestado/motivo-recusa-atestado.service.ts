import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from '../../global';
import { MotivoRecusaAtestado } from '../../model/motivo-recusa-atestado';
import { MotivoRecusaAtestadoFilter } from './motivo-recusa-atestado.filter';
import { GenericService } from '../../generics/generic.service';

@Injectable()
export class MotivoRecusaAtestadoService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"motivo-recusa-atestado");
    }
    
    getMotivoRecusaAtestados() {
        return this.selectList(new MotivoRecusaAtestadoFilter());
    }
    
}