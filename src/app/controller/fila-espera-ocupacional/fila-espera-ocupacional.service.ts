import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GenericService } from './../../generics/generic.service';
import { GlobalVariable } from './../../global';
import { LocalizacaoFilter } from './../localizacao/localizacao.filter';
import { LocalizacaoService } from './../localizacao/localizacao.service';
import { EmpregadoService } from './../empregado/empregado.service';
import { AtendimentoService } from './../atendimento/atendimento.service';
import { RegraAtendimentoService } from './../regra-atendimento/regra-atendimento.service';
import { RegraAtendimentoFilter } from './../regra-atendimento/regra-atendimento.filter';

@Injectable()
export class FilaEsperaOcupacionalService extends GenericService {

    constructor( http: Http, router: Router,
            private localizacaoService: LocalizacaoService,
            private regraAtendimentoService: RegraAtendimentoService,
            private atendimentoService: AtendimentoService,
            private empregadoService: EmpregadoService) { 
        super(http,router,"fila-espera-ocupacional");
    }
    
    getStatusSimNao() {
        let urlStatusSimNao = GlobalVariable.BASE_API_URL + "/generic/status-sim-nao";
        return this.http
            .get( urlStatusSimNao + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    checkIn( filaEsperaOcupacional ) {
        let urlCheckIn = this.URL + "/check-in";
        
        return this.http
            .post( urlCheckIn, filaEsperaOcupacional, { headers: this.headers } )
            .toPromise();
    }
    
    checkOut( filaEsperaOcupacional ) {
        let urlCheckOut = this.URL + "/check-out";
        
        return this.http
            .post( urlCheckOut, filaEsperaOcupacional, { headers: this.headers } )
            .toPromise();
    }
    
    getEmpregadoByName(nome: string) {
        return this.empregadoService.getEmpregadoByName(nome);
    }
    
    getEmpregadoByChave(chave: string) {
        return this.empregadoService.getEmpregadoByChave(chave);
    }
    
    refresh( atendimento ) {
        let urlRefresh = this.URL + "/refresh";
        
        return this.http
            .post( urlRefresh, atendimento, { headers: this.headers } )
            .toPromise();
    }
    
    atualizarLista( filaAtendimentoOcupacional ) {
        return this.atendimentoService.atualizarLista( filaAtendimentoOcupacional );
    }
    
    getLocalizacoes() {
        return this.localizacaoService.selectList( new LocalizacaoFilter() );
    }
    
    getRegraAtendimentos() {
        return this.regraAtendimentoService.selectList( new RegraAtendimentoFilter() );
    }
    
    listAll( filaEsperaOcupacional ) {
        let urlListAll = this.URL + "/list-all";
        
        return this.http
            .post( urlListAll, filaEsperaOcupacional, { headers: this.headers } )
            .toPromise();
    }
    
}