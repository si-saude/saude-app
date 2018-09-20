import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { MudancaFuncao } from './../../model/mudanca-funcao';
import { Regime } from './../../model/regime';
import { RegimeService } from './../../controller/regime/regime.service';
import { GheNomeAutocomplete } from './../../controller/ghe/ghe-nome.autocomplete';
import { GerenciaCodigoCompletoAutocomplete } from './../../controller/gerencia/gerencia-codigo-completo.autocomplete';
import { GheeNomeAutocomplete } from './../../controller/ghee/ghee-nome.autocomplete';
import { FuncaoNomeAutocomplete } from './../../controller/funcao/funcao-nome.autocomplete';
import { BaseNomeAutocomplete } from './../../controller/base/base-nome.autocomplete';
import { EnfaseDescricaoAutocomplete } from './../../controller/enfase/enfase-descricao.autocomplete';

@Component( {
    selector: 'app-include-mudanca-funcao',
    templateUrl: './include-mudanca-funcao.html',
    styleUrls: ['./include-mudanca-funcao.css']
} )
export class IncludeMudancaFuncaoComponent {
    
    @Input() mudancaFuncao: MudancaFuncao;
    @Input() service;
    @Input() desabilitarGhe: boolean;
    @Input() desabilitarGhee: boolean;
    
    private autoCompleteGhe:GheNomeAutocomplete;
    private autoCompleteGerencia: GerenciaCodigoCompletoAutocomplete;
    private autoCompleteEnfase:EnfaseDescricaoAutocomplete;
    private autoCompleteFuncao:FuncaoNomeAutocomplete;
    private autoCompleteGhee:GheeNomeAutocomplete;
    private autoCompleteBase:BaseNomeAutocomplete;
    regimes: Array<Regime>;
    
    constructor( private route: ActivatedRoute, private router: Router) {
     }

    ngOnInit() {        
        this.autoCompleteGhe = new GheNomeAutocomplete(this.service.getGheService());
        this.autoCompleteGerencia = new GerenciaCodigoCompletoAutocomplete(this.service.getGerenciaService());
        this.autoCompleteEnfase = new EnfaseDescricaoAutocomplete(this.service.getEnfaseService());
        this.autoCompleteFuncao = new FuncaoNomeAutocomplete(this.service.getFuncaoService());
        this.autoCompleteGhee = new GheeNomeAutocomplete(this.service.getGheeService());
        this.autoCompleteBase = new BaseNomeAutocomplete(this.service.getBaseService());
        this.getRegimes();
    }   
    
    getRegimes() {
        this.service.getRegimes()
            .then( res => {
                this.regimes = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
}