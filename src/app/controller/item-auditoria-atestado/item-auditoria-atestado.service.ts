import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ItemAuditoriaAtestadoFilter } from './item-auditoria-atestado.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class ItemAuditoriaAtestadoService extends GenericService {
    
    constructor( http: Http, router: Router) { 
        super( http, router, "item-auditoria-atestado" );
    }

    getItemAuditoriaAtestados() {
        return this.selectList(new ItemAuditoriaAtestadoFilter());
    }
    
}