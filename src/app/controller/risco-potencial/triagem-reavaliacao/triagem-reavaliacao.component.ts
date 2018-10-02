import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import { Subscription } from 'rxjs/Rx';

import { Usuario } from './../../../model/usuario';
import { Triagem } from './../../../model/triagem';
import { TriagemBuilder } from './../../triagem/triagem.builder';
import { Diagnostico } from './../../../model/diagnostico';
import { DiagnosticoBuilder } from './../../diagnostico/diagnostico.builder';
import { Intervencao } from './../../../model/intervencao';
import { IntervencaoBuilder } from './../../intervencao/intervencao.builder';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { EquipeFilter } from './../../equipe/equipe.filter';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeFilter } from './../../profissional-saude/profissional-saude.filter';
import { EmpregadoFilter } from './../../empregado/empregado.filter';
import { PessoaFilter } from './../../pessoa/pessoa.filter';
import { RiscoEmpregado } from './../../../model/risco-empregado';
import { RiscoEmpregadoBuilder } from './../../risco-empregado/risco-empregado.builder';
import { RiscoPotencial } from './../../../model/risco-potencial';
import { RiscoPotencialBuilder } from './../../risco-potencial/risco-potencial.builder';
import { IndicadorSast } from './../../../model/indicador-sast';
import { IndicadorSastBuilder } from './../../indicador-sast/indicador-sast.builder';
import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { BooleanFilter } from './../../../generics/boolean.filter';
import { RiscoEmpregadoService } from './../../risco-empregado/risco-empregado.service';
import { RiscoEmpregadoFilter } from './../../risco-empregado/risco-empregado.filter';
import { RiscoPotencialService } from './../../risco-potencial/risco-potencial.service';
import { RiscoPotencialFilter } from './../../risco-potencial/risco-potencial.filter';
import { TriagemUtil } from './../../../generics/utils/triagem.util';
import { ConfirmSaveComponent } from './../../../includes/confirm-save/confirm-save.component';

@Component({
  selector: 'app-triagem-reavaliacao',
  templateUrl: './triagem-reavaliacao.html',
  styleUrls: ['./triagem-reavaliacao.css', './../../../../assets/css/form-component.css']
})
export class TriagemReavaliacaoComponent extends GenericFormComponent implements OnInit {
    private riscoEmpregado: RiscoEmpregado;
    private profissional: Profissional;
    private triagemUtil = new TriagemUtil();
    @ViewChild( ConfirmSaveComponent) confirmSaveComponent: ConfirmSaveComponent;
    
    constructor(private route: ActivatedRoute,
            private riscoEmpregadoService: RiscoEmpregadoService,
            router: Router) {
            super( riscoEmpregadoService, router );
        
            this.profissional = new ProfissionalSaudeBuilder().initialize(new Profissional());
            this.riscoEmpregado = new RiscoEmpregadoBuilder().initialize(undefined);
            this.triagemUtil = new TriagemUtil();
            this.goTo = "risco-potencial";
            
    }

    ngOnInit() {
        let component = this;
        if ( localStorage.getItem( "usuario-id" ) != undefined ) {
            component.riscoEmpregadoService.getUsuario( Number( localStorage.getItem( "usuario-id" ) ) )
                .then( res => {
                    let usuario: Usuario = new Usuario();
                    usuario = new UsuarioBuilder().clone( res.json() );
                    if ( usuario.getId() > 0 && usuario.getPessoa() != undefined ) {
                        let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                        profissionalFilter.setEmpregado( new EmpregadoFilter() );
                        profissionalFilter.getEmpregado().setPessoa( new PessoaFilter() );
                        profissionalFilter.getEmpregado().getPessoa().setCpf( usuario.getPessoa().getCpf() );
                        
                        component.riscoEmpregadoService.getProfissional( profissionalFilter )
                            .then( res => {
                                if ( res.json().list[0] != undefined ) {
                                    component.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
                                    if(!localStorage.getItem("riscoEmpregadoReavaliacao")){   
                                        component.router.navigate( ["/home"] );
                                    }else{
                                        this.riscoEmpregado = new RiscoEmpregadoBuilder().clone(JSON.parse(localStorage.getItem("riscoEmpregadoReavaliacao")));
                                        this.riscoEmpregado.setProfissional(component.profissional);
                                        localStorage.removeItem("riscoEmpregadoReavaliacao");
                                    }                                  
                            } else {
                                component.router.navigate( ["/risco-potencial"] );
                                    return;
                                }
                            } )
                            .catch( error => {
                                console.log( "Erro no servidor ao buscar o profissional. Tentar mais tarde." );
                                component.catchConfiguration( error );
                            } )
                    } else {
                        component.router.navigate( ["/login"] );
                        return;
                    }
                } )
                .catch( error => {
                    console.log( "Erro no servidor ao buscar o usuario." );
                    component.catchConfiguration( error );
                } )
        } else {
            console.log( "Usuario nao logada." );
            component.router.navigate( ["/login"] );
        }
    }
    
    save() {
        if ( !this.triagemUtil.verifyValidTriagens( this.riscoEmpregado.getTriagens() ) ) {
            this.toastParams = ["Por favor, preencha os campos de Triagem exigidos", 4000];
            this.globalActions.emit( 'toast' );
            return;
        } 
        this.showPreload = true;
        this.canDeactivate = true;
        this.riscoEmpregadoService.saveReavaliacao(new RiscoEmpregadoBuilder().clone(this.riscoEmpregado))
            .then( res => {
                this.confirmSaveComponent.setGoTo("$*close*$");
                this.processReturn( true, res );
            } )
            .catch( error => {
                this.processReturn( false, error );
            } )
    }
    
  
    
    ngOnDestroy() {
        if ( this.inscricao != undefined ) 
            this.inscricao.unsubscribe();
    }
}
