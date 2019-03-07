import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from '../../global';
import { AvaliacaoFisica } from '../../model/avaliacao-fisica';
import { AvaliacaoFisicaFilter } from '../avaliacao-fisica/avaliacao-fisica.filter';
import { GenericService } from '../../generics/generic.service';
import { MedidaAlimentarService } from './../medida-alimentar/medida-alimentar.service';

@Injectable()
export class AvaliacaoFisicaService extends GenericService {

    constructor( http: Http, router: Router) { 
        super(http,router,"avaliacao-fisica");
    }  
    
    
    getRelatorioProafAtendimento( atendimentoId ) {
        let urlRelatorio = this.URL + "/get-relatorio-proaf-by-atendimento";
        return this.http
            .post( urlRelatorio, atendimentoId, { headers: this.headers } )
            .toPromise();
    }
}