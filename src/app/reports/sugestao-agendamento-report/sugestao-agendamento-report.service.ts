import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GenericService } from './../../generics/generic.service';
import { InterfaceServiceReport } from './../../interfaces/interface.service.report';
import { GlobalVariable } from './../../global';
import { ConvocacaoService } from './../../controller/convocacao/convocacao.service';

@Injectable()
export class SugestaoAgendamentoReportService extends GenericService {

    constructor( http: Http, router: Router, 
            private convocacaoService: ConvocacaoService) { 
        super(http, router, "sugestao-agendamento");
    }
    
    getSugestoes(id: number) {
        let urlSugestoes = this.URL;
        return this.http
            .get( urlSugestoes + "?id="+id.toString(), { headers: this.headers } )
            .toPromise();
    }
    
    getTipoConvocacoes() {
        let urlTipoConvocacoes = GlobalVariable.BASE_API_URL + "/generic/tipo-convocacao";
        return this.http
            .get( urlTipoConvocacoes, { headers: this.headers } )
            .toPromise();
    }
    
    getConvocacaoService() {
        return this.convocacaoService;
    }
}