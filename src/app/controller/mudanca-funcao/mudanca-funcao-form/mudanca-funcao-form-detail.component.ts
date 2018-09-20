import { Component, OnInit, ViewChild, EventEmitter,ViewEncapsulation, ElementRef} from '@angular/core';
import { NgForm } from "@angular/forms";


import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeDirective} from "angular2-materialize";
import { MaterializeAction } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';

import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { MudancaFuncao } from './../../../model/mudanca-funcao';
import { MudancaFuncaoBuilder } from './../mudanca-funcao.builder';
import { TarefaBuilder } from './../../tarefa/tarefa.builder';
import { Tarefa } from './../../../model/tarefa';
import { Regime } from './../../../model/regime';
import { MudancaFuncaoService } from './../mudanca-funcao.service';
import { GheNomeAutocomplete } from './../../ghe/ghe-nome.autocomplete';
import { GerenciaCodigoCompletoAutocomplete } from './../../gerencia/gerencia-codigo-completo.autocomplete';
import { GheeNomeAutocomplete } from './../../ghee/ghee-nome.autocomplete';
import { FuncaoNomeAutocomplete } from './../../funcao/funcao-nome.autocomplete';
import { BaseNomeAutocomplete } from './../../base/base-nome.autocomplete';
import { EnfaseDescricaoAutocomplete } from './../../enfase/enfase-descricao.autocomplete';


@Component( {
    selector: 'app-mudanca-funcao-form',
    templateUrl: './mudanca-funcao-form.html',   
    styleUrls: ['./mudanca-funcao-form.css','./../../../../assets/css/modal-filter.css','./../../../../assets/css/form-component.css']
} )
export class MudancaFuncaoFormDetailComponent extends GenericFormComponent implements OnInit {
    private autoCompleteGhe:GheNomeAutocomplete;
    private autoCompleteGerencia: GerenciaCodigoCompletoAutocomplete;
    private autoCompleteEnfase:EnfaseDescricaoAutocomplete;
    private autoCompleteFuncao:FuncaoNomeAutocomplete;
    private autoCompleteGhee:GheeNomeAutocomplete;
    private autoCompleteBase:BaseNomeAutocomplete;
    regimes: Array<Regime>;
    tarefa: Tarefa;
    mudancaFuncao: MudancaFuncao;
    dataInicio: any;
        
    constructor( private route: ActivatedRoute,
        private mudancaFuncaoService: MudancaFuncaoService,     
        router: Router) {
        super( mudancaFuncaoService, router );
        this.goTo = "mudanca-funcao";
         
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.mudancaFuncao = new MudancaFuncaoBuilder().initialize(this.mudancaFuncao);
        this.autoCompleteGhe = new GheNomeAutocomplete(this.mudancaFuncaoService.getGheService());
        this.autoCompleteGerencia = new GerenciaCodigoCompletoAutocomplete(this.mudancaFuncaoService.getGerenciaService());
        this.autoCompleteEnfase = new EnfaseDescricaoAutocomplete(this.mudancaFuncaoService.getEnfaseService());
        this.autoCompleteFuncao = new FuncaoNomeAutocomplete(this.mudancaFuncaoService.getFuncaoService());
        this.autoCompleteGhee = new GheeNomeAutocomplete(this.mudancaFuncaoService.getGheeService());
        this.autoCompleteBase = new BaseNomeAutocomplete(this.mudancaFuncaoService.getBaseService());   
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
                ( params: any ) => {
                    if ( params['id'] !== undefined ) {
                        let id = params['id'];
                        this.showPreload = true;

                        this.service.get( id )
                            .then( res => {
                                this.showPreload = false;
                                this.mudancaFuncao = new MudancaFuncaoBuilder().clone( res.json() );
                            } )
                            .catch( error => {
                                this.catchConfiguration( error );
                            } )
                    }
                } );
        
        this.getRegimes();
    }
    
    
    getRegimes() {
        this.mudancaFuncaoService.getRegimes()
            .then( res => {
                this.regimes = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
//    
//    addMudancaFuncaoItem() {     
//        this.mudancaFuncaoItem.setCategoriaRisco(this.categoriaRiscos.find(c => c.getId() == this.mudancaFuncaoItem.getCategoriaRisco().getId()));            
//        this.mudancaFuncao.getMudancaFuncaoItens().push(new MudancaFuncaoItemBuilder().clone(this.mudancaFuncaoItem));
//    }
//    
//    
//     removeMudancaFuncao(i: number) {
//        this.mudancaFuncao.getMudancaFuncaoItens().splice(i, 1);
//    }
     
    
     
    
    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    save() {
        super.save( new MudancaFuncaoBuilder().clone( this.mudancaFuncao ) );
    }
}