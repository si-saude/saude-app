import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { RiscoPotencial } from './../../model/risco-potencial';
import { RiscoPotencialFilter } from './risco-potencial.filter';
import { GenericService } from './../../generics/generic.service';
import { DiagnosticoService } from './../diagnostico/diagnostico.service';
import { IntervencaoService } from './../intervencao/intervencao.service';
import { EmpregadoService } from './../empregado/empregado.service';
import { EquipeService } from './../equipe/equipe.service';

@Injectable()
export class RiscoPotencialService extends GenericService {

    constructor( http: Http, router: Router,
            private empregadoService: EmpregadoService,
            private diagnosticoService: DiagnosticoService,
            private intervencaoService: IntervencaoService,
            private equipeService: EquipeService ) { 
        super(http,router,"risco-potencial");
    }
    
    getRiscos() {
        return this.selectList(new RiscoPotencialFilter());
    }
    
    listAll( filter: RiscoPotencialFilter) {
        let urlList = this.URL + "/list-all";
        return this.http
            .post( urlList, filter, { headers: this.headers } )
            .toPromise();
    }
    
    getTipoAcao( filter: RiscoPotencialFilter) {
        let urlTipoAcao = GlobalVariable.BASE_API_URL + "/generic/tipo-acao";
        return this.http
            .get( urlTipoAcao + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getStatusAcao( filter: RiscoPotencialFilter) {
        let urlStatusAcao = GlobalVariable.BASE_API_URL + "/generic/status-acao";
        return this.http
            .get( urlStatusAcao + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getTipoContatoAcao( filter: RiscoPotencialFilter) {
        let urlTipoContato = GlobalVariable.BASE_API_URL + "/generic/tipo-contato";
        return this.http
            .get( urlTipoContato + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getPrazos() {
        let urlPrazo = GlobalVariable.BASE_API_URL + "/generic/prazo-em-meses";
        return this.http
            .get( urlPrazo + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getDiagnosticoByDescricaoAndAbreviacao( descricao, abreviacaoEquipe ) {
        return this.diagnosticoService.getDiagnosticoByDescricaoAndAbreviacao(descricao, abreviacaoEquipe);
    }
    
    getDiagnosticoByCodigoAndAbreviacao( codigo, abreviacaoEquipe ) {
        return this.diagnosticoService.getDiagnosticoByCodigoAndAbreviacao(codigo, abreviacaoEquipe);
    }
    
    getIntervencaoByDescricaoAndAbreviacao( descricao, abreviacaoEquipe ) {
        return this.intervencaoService.getIntervencaoByDescricaoAndAbreviacao(descricao, abreviacaoEquipe);
    }
    
    getEquipeAbordagemByName( nome ) {
        return this.equipeService.getEquipeByName(nome);
    }
    
}