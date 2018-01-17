import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GenericService } from './../../generics/generic.service';
import { GlobalVariable } from './../../global';
import { LocalizacaoFilter } from './../localizacao/localizacao.filter';
import { LocalizacaoService } from './../localizacao/localizacao.service';
import { RegraAtendimentoFilter } from './../regra-atendimento/regra-atendimento.filter';
import { RegraAtendimentoService } from './../regra-atendimento/regra-atendimento.service';

@Injectable()
export class FilaEsperaOcupacionalService extends GenericService {

    constructor( http: Http, router: Router,
            private localizacaoService: LocalizacaoService,
            private regraAtendimentoService: RegraAtendimentoService ) { 
        super(http,router,"fila-espera-ocupacional");
    }
    
    checkIn( filaEsperaOcupacional ) {
        let urlCheckIn = this.URL + "/check-in";
        
        return this.http
            .post( urlCheckIn, filaEsperaOcupacional, { headers: this.headers } )
            .toPromise();
    }
    
    refresh( atendimento ) {
        let urlRefresh = this.URL + "/refresh";
        
        return this.http
            .post( urlRefresh, atendimento, { headers: this.headers } )
            .toPromise();
    }
    
    getLocalizacoes() {
        return this.localizacaoService.selectList( new LocalizacaoFilter() );
    }
    
    getRegraAtendimentos() {
        return this.regraAtendimentoService.selectList( new RegraAtendimentoFilter() );
    }
    
}