import { Component, OnInit, ViewChild, EventEmitter,ViewEncapsulation, ElementRef} from '@angular/core';
import { NgForm } from "@angular/forms";


import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeDirective} from "angular2-materialize";
import { MaterializeAction } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';

import { Usuario } from './../../../model/usuario';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { PessoaFilter } from './../../pessoa/pessoa.filter';
import { ProfissionalSaudeFilter } from './../../profissional-saude/profissional-saude.filter';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { EmpregadoFilter } from './../../empregado/empregado.filter';

import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { MudancaFuncao } from './../../../model/mudanca-funcao';
import { MudancaFuncaoBuilder } from './../mudanca-funcao.builder';
import { Regime } from './../../../model/regime';
import { MudancaFuncaoService } from './../mudanca-funcao.service';
import { GheNomeAutocomplete } from './../../ghe/ghe-nome.autocomplete';
import { GerenciaCodigoCompletoAutocomplete } from './../../gerencia/gerencia-codigo-completo.autocomplete';
import { GheeNomeAutocomplete } from './../../ghee/ghee-nome.autocomplete';
import { FuncaoNomeAutocomplete } from './../../funcao/funcao-nome.autocomplete';
import { BaseNomeAutocomplete } from './../../base/base-nome.autocomplete';
import { CargoNomeAutocomplete } from './../../cargo/cargo-nome.autocomplete';
import { Profissional } from './../../../model/profissional';

@Component( {
    selector: 'app-mudanca-funcao-form',
    templateUrl: './mudanca-funcao-form.html',   
    styleUrls: ['./mudanca-funcao-form.css','./../../../../assets/css/modal-filter.css','./../../../../assets/css/form-component.css']
} )
export class MudancaFuncaoFormComponent extends GenericFormComponent implements OnInit {
    private autoCompleteGhe:GheNomeAutocomplete;
    private autoCompleteGerencia: GerenciaCodigoCompletoAutocomplete;
    private autoCompleteCargo:CargoNomeAutocomplete;
    private autoCompleteFuncao:FuncaoNomeAutocomplete;
    private autoCompleteGhee:GheeNomeAutocomplete;
    private autoCompleteBase:BaseNomeAutocomplete;
    private listStatus: Array<string>;   
    private usuario: Usuario;
    private profissional: Profissional;
    regimes: Array<Regime>;
    mudancaFuncao: MudancaFuncao;
        
    constructor( private route: ActivatedRoute,
        private mudancaFuncaoService: MudancaFuncaoService,     
        router: Router) {
        super( mudancaFuncaoService, router );
        this.goTo = "mudanca-funcao";
        
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.mudancaFuncao = new MudancaFuncaoBuilder().initialize(this.mudancaFuncao);
        this.autoCompleteGhe = new GheNomeAutocomplete(this.mudancaFuncaoService.getGheService());
        this.autoCompleteGerencia = new GerenciaCodigoCompletoAutocomplete(this.mudancaFuncaoService.getGerenciaService());
        this.autoCompleteCargo = new CargoNomeAutocomplete(this.mudancaFuncaoService.getCargoService());
        this.autoCompleteFuncao = new FuncaoNomeAutocomplete(this.mudancaFuncaoService.getFuncaoService());
        this.autoCompleteGhee = new GheeNomeAutocomplete(this.mudancaFuncaoService.getGheeService());
        this.autoCompleteBase = new BaseNomeAutocomplete(this.mudancaFuncaoService.getBaseService());   
        this.listStatus = new Array<string>();
        this.profissional = new ProfissionalSaudeBuilder().initialize( new Profissional() );
    }

    ngOnInit() {
        if ( localStorage.getItem( "usuario-id" ) != undefined ) {
            this.mudancaFuncaoService.getUsuario( Number( localStorage.getItem( "usuario-id" ) ) )
                .then( res => {
                    this.usuario = new UsuarioBuilder().clone( res.json() );
                    if ( this.usuario.getId() > 0 && this.usuario.getPessoa() != undefined ) {
                        let pessoaFilter: PessoaFilter = new PessoaFilter();
                        pessoaFilter.setCpf( this.usuario.getPessoa().getCpf() );
                        let empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
                        empregadoFilter.setPessoa( pessoaFilter );
                        let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                        profissionalFilter.setEmpregado( empregadoFilter );

                        this.mudancaFuncaoService.getProfissional( profissionalFilter )
                            .then( res => {
                                if ( res.json().list[0] != undefined ) {
                                    this.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
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
                                        this.getStatus();
                                        
                                } else {
                                    this.router.navigate( ["/home"] );
                                    return;
                                }
                            } )
                            .catch( error => {
                                console.log( "Erro no servidor ao buscar o profissional. Tentar mais tarde." );
                                this.catchConfiguration( error );
                            } )
                    } else {
                        this.router.navigate( ["/login"] );
                        return;
                    }
                } )
                .catch( error => {
                    console.log( "Erro no servidor ao buscar o usuario." );
                    this.catchConfiguration( error );
                } )
        } else {
            console.log( "Usuario nao logada." );
            this.router.navigate( ["/login"] );
        }
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
    
    getStatus() {
        this.mudancaFuncaoService.getStatus()
            .then(res => {
                this.listStatus = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao retornar Status.");
            })
    }

    setarResponsavel(i: number) {
        this.mudancaFuncao.getTarefas()[i].setResponsavel(this.profissional);
    }
    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    save() {
//       new MudancaFuncaoBuilder().clone( this.mudancaFuncao ).getTarefas()[0].getInicio();
        super.save( new MudancaFuncaoBuilder().clone( this.mudancaFuncao ) );
    }
}