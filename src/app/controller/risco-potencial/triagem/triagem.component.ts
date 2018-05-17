import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import { Subscription } from 'rxjs/Rx';

import { Usuario } from './../../../model/usuario';
import { Triagem } from './../../../model/triagem';
import { Diagnostico } from './../../../model/diagnostico';
import { DiagnosticoBuilder } from './../../diagnostico/diagnostico.builder';
import { Intervencao } from './../../../model/intervencao';
import { IntervencaoBuilder } from './../../intervencao/intervencao.builder';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
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
import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { RiscoEmpregadoService } from './../../risco-empregado/risco-empregado.service';
import { RiscoPotencialService } from './../../risco-potencial/risco-potencial.service';
import { TriagemUtil } from './../../../generics/utils/triagem.util';
import { PlanejamentoUtil } from './../../../generics/utils/planejamento.util';

@Component({
  selector: 'app-risco-potencial-triagem',
  templateUrl: './triagem.html',
  styleUrls: ['./triagem.css', './../../../../assets/css/form-component.css']
})
export class TriagemComponent extends GenericFormComponent implements OnInit {
    private riscoPotencial: RiscoPotencial;
    private riscoEmpregado: RiscoEmpregado;
    private profissional: Profissional;
    private prazos: Array<string>;
    private tabsActions;
    private triagemIndices: Map<number, number>;

    private flagIdTriagem: number;
    private activeDiagnostico:boolean;
    private activeIntervencao:boolean;
    
    private idEquipeProfissional: number;
    private showModalDiagnostico: boolean;
    private showModalIntervencao: boolean;
    private showModalEquipe: boolean;
    
    private triagemUtil: TriagemUtil;
    private planejamentoUtil: PlanejamentoUtil;
    
    constructor(private route: ActivatedRoute,
            private riscoEmpregadoService: RiscoEmpregadoService,
            router: Router) {
            super( riscoEmpregadoService, router );
        
            this.goTo = "risco-potencial";
            
            this.riscoPotencial = new RiscoPotencialBuilder().initialize(new RiscoPotencial());            
            this.riscoEmpregado = new RiscoEmpregadoBuilder().initialize(new RiscoEmpregado());
            this.profissional = new ProfissionalSaudeBuilder().initialize(new Profissional());
            this.tabsActions = new EventEmitter<string | MaterializeAction>();
            this.triagemIndices = new Map<number, number>();
            this.prazos = new Array<string>();
            
            this.activeDiagnostico = false;
            this.activeIntervencao = false;
            
            this.triagemUtil = new TriagemUtil();
            this.planejamentoUtil = new PlanejamentoUtil();
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
                                
                                    component.inscricao = this.route.params.subscribe(
                                            ( params: any ) => {
                                                if( params['id'] !== undefined ) {
                                                    let id = params['id'];
                                                    component.showPreload = true;
    
                                                    component.riscoEmpregadoService.getRiscoPotencial( id )
                                                        .then( res => {
                                                            component.showPreload = false;
                                                            component.riscoPotencial = new RiscoPotencialBuilder().clone( res.json() );
                                                            component.riscoEmpregadoService.getByProfissional(component.riscoPotencial.getId(), component.profissional.getId())
                                                                    .then(res => {
                                                                        component.riscoEmpregado = new RiscoEmpregadoBuilder().clone( res.json().list[0] );
                                                                        
                                                                        setTimeout(() => {
                                                                            component.triagemIndices = new Map<number, number>();
                                                                            
                                                                            for ( let idx = 0; idx < component.riscoEmpregado.getTriagens().length; idx++ ) {
                                                                                component.triagemIndices.set( idx, this.riscoEmpregado.getTriagens()[idx].getIndice() );
                                                                                if ( component.riscoEmpregado.getTriagens()[idx].getIndice() != -1 ) {
                                                                                    let i: string = "indice" + component.triagemIndices.get( idx ) + "_" + idx;
                                                                                    $( "td[title=" + i + "]" ).css( "background", "#D4D4D4" );
                                                                                }
                                                                            }
                                                                        }, 200 );
                                                                    })
                                                                    .catch(error => {
                                                                        component.catchConfiguration( error );
                                                                    })
                                                        } )
                                                        .catch( error => {
                                                            component.catchConfiguration( error );
                                                        } )
                                                }
                                            } );
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
        
        component.getPrazos();
    }
    
    save() {
        if ( !this.triagemUtil.verifyValidTriagens( this.riscoEmpregado.getTriagens() ) ) {
            this.toastParams = ["Por favor, preencha os campos de Triagem exigidos", 4000];
            this.globalActions.emit( 'toast' );
            return;
        }

        if ( !this.planejamentoUtil.verifyPlanejamento( this.riscoEmpregado.getTriagens(), this.profissional.getEquipe().getId() ) ) {
            this.toastParams = ["Por favor, preencha os campos do Planejamento exigidos", 4000];
            this.globalActions.emit( 'toast' );
            return;
        }
        
        super.save(new RiscoEmpregadoBuilder().clone(this.riscoEmpregado));
    }
    
    getPrazos() {
        this.riscoEmpregadoService.getPrazos()
            .then( res => {
                this.prazos = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( "Erro ao retornar os prazos." );
            } )
    }
    
    verifyIndiceTriagem( triagem: Triagem ) {
        if ( triagem.getIndice() > -1 ) return true;

        return false;
    }
    
    getIndiceDescricao( triagem: Triagem ) {
        return triagem.getIndice() + " - " + triagem["indicadorSast"]["indice" + triagem.getIndice()];
    }
    
    selectTriagem( indexTriagem, indice ) {
        let i: string = "indice" + indice + "_" + indexTriagem.toString();

        if ( this.triagemIndices.get( indexTriagem ) != undefined ) {
            if ( this.triagemIndices.get( indexTriagem ) == Number( indice ) ) {
                $( "td[title=" + i + "]" ).css( "background", "" );
                this.riscoEmpregado.getTriagens()[indexTriagem].setIndice( -1 );
                this.triagemIndices.delete( indexTriagem );
                return;
            }
            let iAntigo: string = "indice" + this.triagemIndices.get( indexTriagem ) + "_" + indexTriagem.toString();
            $( "td[title=" + iAntigo + "]" ).css( "background", "" );
        }

        $( "td[title=" + i + "]" ).css( "background", "#D4D4D4" );
        
        this.triagemIndices.set( indexTriagem, Number( indice ) );

        this.riscoEmpregado.getTriagens()[indexTriagem].setIndice( Number( indice ) );
    }
    
    verifyValidTriagens() {
        let triagem = this.riscoEmpregado.getTriagens().find( t => {
            if ( t.getIndicadorSast().getObrigatorio() == true && t.getIndice() == -1 )
                return true;
            else return false;
        } );

        if ( triagem != undefined ) return false;
        else return true;
    }

    verifyPlanejamento() {
        let ret: boolean = true;
        let triagens: Array<Triagem> = new Array<Triagem>();
        let triagensInvalidas: Array<Triagem> = new Array<Triagem>();

        if ( this.riscoEmpregado.getTriagens().length == 0 ) return true;

        triagens = this.riscoEmpregado.getTriagens().filter( t => {
            if ( t.getIndice() > -1 ) {
                if ( t.getDiagnostico().getDescricao() == "" || t.getDiagnostico().getDescricao() == undefined ) {
                    triagensInvalidas.push( t );
                    return false;
                } else if ( t.getIntervencao().getDescricao() == "" || t.getIntervencao().getDescricao() == undefined ) {
                    triagensInvalidas.push( t );
                    return false;
                } else if ( t.getEquipeAbordagem().getNome() == "" || t.getEquipeAbordagem().getNome() == undefined ) {
                    triagensInvalidas.push( t );
                    return false;
                } else if ( t.getPrazo() == "" || t.getPrazo() == undefined ) {
                    triagensInvalidas.push( t );
                    return false;
                }
            }

            return true;
        } )

        if ( triagens.length > 0 ){
            triagensInvalidas.forEach( t => {
                if (t.getIndice() < 3 && (t.getJustificativa() == "" || t.getJustificativa() == undefined) )
                    ret = false;
            } );
            
            if( triagens.find(t => t.getEquipeAbordagem().getId() == this.profissional.getEquipe().getId())
                    == undefined)
                ret = false;
        }
        else ret = false;

        return ret;
    }
    
    openModalDiagnostico( triagem: Triagem ) {
        this.activeDiagnostico = true;
        this.activeIntervencao = false;
        this.showModalDiagnostico = true;
        this.flagIdTriagem = triagem.getId();
        this.idEquipeProfissional = this.profissional.getEquipe().getId();
    }
    
    selectDiagnostico( diagnostico: Diagnostico ) {
        let triagem = this.riscoEmpregado.getTriagens().find(t => t.getId() == this.flagIdTriagem);
        triagem.setDiagnostico(diagnostico);
        this.showModalDiagnostico = false; 
    }
    
    cancelarModalDiagnostico() {
        this.showModalDiagnostico = false;
    }
    
    openModalIntervencao( triagem: Triagem ) {
        this.activeDiagnostico = false;
        this.activeIntervencao = true;
        this.showModalIntervencao = true;
        this.flagIdTriagem = triagem.getId();
        this.idEquipeProfissional = this.profissional.getEquipe().getId();
    }
    
    selectIntervencao( intervencao: Intervencao) {
        let triagem = this.riscoEmpregado.getTriagens().find(t => t.getId() == this.flagIdTriagem);
        triagem.setIntervencao(intervencao);
        this.showModalIntervencao = false;
    }
    
    cancelarModalIntervencao( valor ) {
        this.showModalIntervencao = false;
    }
    
    openModalEquipe( triagem: Triagem ) {
        this.flagIdTriagem = triagem.getId();
        this.showModalEquipe = true;
    }
    
    selectEquipe( equipe: Equipe ) {
        let triagem = this.riscoEmpregado.getTriagens().find(t => t.getId() == this.flagIdTriagem);
        triagem.setEquipeAbordagem(equipe);
        this.showModalEquipe = false;
    }
    
    cancelarModalEquipe( valor ) {
        this.showModalEquipe = false;
    }
    
    planejamentoBackground( triagem: Triagem ) {
        if ( triagem.getIndice() <= 2 )
            return 'red';
    }
    
    verifyObrigatoriedadeIndicador( triagem: Triagem ) {
        if ( triagem.getIndicadorSast().getObrigatorio() ) 
            return "triagem-indicador-bold";
        
        return "";
    } 
    
    ngOnDestroy() {
        if ( this.inscricao != undefined ) 
            this.inscricao.unsubscribe();
    }
}
