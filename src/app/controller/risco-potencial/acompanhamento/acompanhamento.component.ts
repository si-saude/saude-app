import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { RiscoPotencialService } from './../risco-potencial.service';
import { Triagem } from './../../../model/triagem';
import { TriagemBuilder } from './../../triagem/triagem.builder';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { Acompanhamento } from './../../../model/acompanhamento';
import { AcompanhamentoBuilder } from './../../acompanhamento/acompanhamento.builder';
import { Acao } from './../../../model/acao';
import { AcaoBuilder } from './../../acao/acao.builder';
import { Tarefa } from './../../../model/tarefa';
import { RiscoEmpregado } from './../../../model/risco-empregado';
import { RiscoPotencial } from './../../../model/risco-potencial';
import { RiscoEmpregadoBuilder } from './../../risco-empregado/risco-empregado.builder';
import { RiscoPotencialBuilder } from './../risco-potencial.builder';
import { RiscoPotencialFilter } from './../risco-potencial.filter';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeFilter } from './../../profissional-saude/profissional-saude.filter';
import { Usuario } from './../../../model/usuario';
import { PessoaFilter } from './../../pessoa/pessoa.filter';
import { EmpregadoFilter } from './../../empregado/empregado.filter';
import { ConfirmSaveComponent } from './../../../includes/confirm-save/confirm-save.component';
import { TextUtil } from './../../../generics/utils/text.util';
import { Util } from './../../../generics/utils/util';

@Component( {
    selector: 'app-acompanhamento',
    templateUrl: './acompanhamento.html',
    styleUrls: ['./acompanhamento.css', './../../../../assets/css/form-component.css']
} )
export class AcompanhamentoComponent extends GenericFormComponent implements OnInit {
    private equipesAbordagemTriagens: Array<Equipe>;
    private triagensByEquipeAbordagem = [[]];
    private triagens: Array<Triagem>;
    private riscoPotencial: RiscoPotencial;
    private acaoAux: Acao;
    private acompanhamentoAux: Acompanhamento;
    private tipoAcoes: Array<string>;
    private statusAcoes: Array<string>;
    private tipoContatoAcoes: Array<string>;
    private flagTriagem: Triagem;
    private flagIndexAcompanhamento: number = -1;
    private flagEditAcompanhamento: boolean;
    private modalAcompanhamento;
    private triagemAux : Triagem;
    private profissional: Profissional;
    private textUtil: TextUtil;
    @ViewChild( ConfirmSaveComponent) confirmSaveComponent: ConfirmSaveComponent;

    constructor( private route: ActivatedRoute,
        private riscoPotencialService: RiscoPotencialService,
        router: Router ) {
        super( riscoPotencialService, router );

        this.goTo = "risco-potencial";

        this.equipesAbordagemTriagens = new EquipeBuilder().initializeList( new Array<Equipe>() );
        this.riscoPotencial = new RiscoPotencialBuilder().initialize( new RiscoPotencial() );
        this.modalAcompanhamento = new EventEmitter<string | MaterializeAction>();
        this.acaoAux = new AcaoBuilder().initialize( new Acao() );
        this.profissional = new ProfissionalSaudeBuilder().initialize( new Profissional() );
        this.triagemAux = new TriagemBuilder().initialize(new Triagem());
        this.textUtil = new TextUtil();
        this.acompanhamentoAux = new AcompanhamentoBuilder().initialize(new Acompanhamento());
        
        this.triagens = new TriagemBuilder().initializeList(undefined);
    }

    ngOnInit() {
        $( ".container" ).get( 0 ).style.width = "100%";
        if ( localStorage.getItem( "usuario-id" ) != undefined ) {
            this.riscoPotencialService.getUsuario( Number( localStorage.getItem( "usuario-id" ) ) )
                .then( res => {
                    let usuario: Usuario = new Usuario();
                    usuario = new UsuarioBuilder().clone( res.json() );
                    if ( usuario.getId() > 0 && usuario.getPessoa() != undefined ) {
                        let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                        profissionalFilter.setEmpregado( new EmpregadoFilter() );
                        profissionalFilter.getEmpregado().setPessoa( new PessoaFilter() );
                        profissionalFilter.getEmpregado().getPessoa().setCpf( usuario.getPessoa().getCpf() );

                        this.riscoPotencialService.getProfissional( profissionalFilter )
                            .then( res => {
                                if ( res.json().list[0] != undefined ) {
                                    this.textUtil.setTextLength(40);
                                    this.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );

                                    this.inscricao = this.route.params.subscribe(
                                        ( params: any ) => {
                                            if ( params['id'] !== undefined ) {
                                                let id = params['id'];
                                                this.showPreload = true;

                                                this.riscoPotencialService.getAcoes( id )
                                                    .then( res => {
                                                        this.showPreload = false;
                                                        this.riscoPotencial = new RiscoPotencialBuilder().clone( res.json() );
                                                        this.riscoPotencial.setProfissional(this.profissional);
                                                        this.getTriagensEquipeAbordagem();
                                                        
                                                        this.riscoPotencial.getRiscoEmpregados().filter(r => r.getAtivo()).forEach(r=>{
                                                            r.getTriagens().forEach(t => {
                                                                if(t.getEquipeAbordagem() && t.getEquipeAbordagem().getId() > 0 && this.verificarTriagens(t)){
                                                                   this.triagens.push(t);                                                                   
                                                                   this.triagens.sort(function(a, b){
                                                                       
                                                                       if ( a['equipeAbordagem']['abreviacao'] > b['equipeAbordagem']['abreviacao'] )
                                                                           return 1;
                                                                       else if ( a['equipeAbordagem']['abreviacao'] < b['equipeAbordagem']['abreviacao'] )
                                                                           return -1;
                                                                       else return 0;
                                                                   });
                                                                }
                                                            });
                                                        });
                                                    } )
                                                    .catch( error => {
                                                        this.showPreload = false;
                                                        this.catchConfiguration( error );
                                                    } )
                                            }
                                        } );
                                    this.getTipoAcao();
                                    this.getStatusAcao();
                                    this.getTipoContatoAcao();                                    
                                } else {
                                    this.router.navigate( ["/risco-potencial"] );
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

    getTipoAcao() {
        this.riscoPotencialService.getTipoAcao( new RiscoPotencialFilter() )
            .then( res => {
                this.tipoAcoes = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getStatusAcao() {
        this.riscoPotencialService.getStatusAcao( new RiscoPotencialFilter() )
            .then( res => {
                this.statusAcoes = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getTipoContatoAcao() {
        this.riscoPotencialService.getTipoContatoAcao( new RiscoPotencialFilter() )
            .then( res => {
                this.tipoContatoAcoes = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    selectTriagem( indexTriagem: number ) {
        this.triagemAux.setSelecionado("");
        this.acaoAux.setSelecionado("");
        this.triagemAux = this.triagens[indexTriagem];
        this.acaoAux = new AcaoBuilder().initialize(new Acao());
        this.triagemAux.setSelecionado("active");
    }
   
    selectAcao(indexAcao: number) {
        this.acaoAux.setSelecionado("");
        this.acaoAux =  this.triagemAux.getAcoes()[indexAcao]
        this.acaoAux.setSelecionado("active");
    }

    verificarTriagens(triagem: Triagem){
        return ((triagem.getEquipeAbordagem().getId() == this.profissional.getEquipe().getId() ||
                this.riscoPotencial.getEquipeResponsavel().getId() == this.profissional.getEquipe().getId()) &&
                this.riscoPotencial.getEquipes().filter(x => x.getId() == triagem.getEquipeAbordagem().getId()).length > 0);        
    }
    save() {
        this.showPreload = true;
        this.canDeactivate = true;
        this.riscoPotencialService.saveAcompanhamentos( new RiscoPotencialBuilder().clone( this.riscoPotencial ) )
            .then( res => {
                this.confirmSaveComponent.setGoTo("$*close*$");
                this.processReturn( true, res );
            } )
            .catch( error => {
                this.processReturn( false, error );
            } )
    }
    
    saveAndRedirect() {
        this.showPreload = true;
        this.canDeactivate = true;
        
        let riscoEmpregado: RiscoEmpregado = this.riscoPotencial.getRiscoEmpregados().find(r=> r.getEquipe().getId() == this.profissional.getEquipe().getId() && r.getAtivo());
        riscoEmpregado.setRiscoPotencial(new RiscoPotencial());
        riscoEmpregado.getRiscoPotencial().setId(this.riscoPotencial.getId());
        riscoEmpregado.setEmpregado(this.riscoPotencial.getEmpregado());
        riscoEmpregado.getRiscoPotencial().setEquipeResponsavel(this.riscoPotencial.getEquipeResponsavel())
        this.riscoPotencialService.saveAcompanhamentos( new RiscoPotencialBuilder().clone( this.riscoPotencial ) )
            .then( res => {
                localStorage.setItem("riscoEmpregadoReavaliacao", JSON.stringify(riscoEmpregado));
                this.router.navigate(['/risco-potencial/triagem-reavaliacao'])
            } )
            .catch( error => {
                this.processReturn( false, error );
            } )
    }

    getTriagensEquipeAbordagem() {
        this.riscoPotencial.getRiscoEmpregados().forEach( rE => {
            if ( rE.getAtivo() ) {
                rE.getTriagens().forEach( t => {
                    if ( this.riscoPotencial.getEquipeResponsavel().getId() == this.profissional.getEquipe().getId() ||
                            this.profissional.getEquipe().getId() == t.getEquipeAbordagem().getId() ) {
                        if ( t.getEquipeAbordagem().getId() > 0 &&
                            this.equipesAbordagemTriagens.find( eA => eA.getId() == t.getEquipeAbordagem().getId() ) == undefined ) {
        
                            if ( this.riscoPotencial.getEquipes().find( e => e.getId() == t.getEquipeAbordagem().getId() ) != undefined ) {
                                this.equipesAbordagemTriagens.push( t.getEquipeAbordagem() );
                                this.triagensByEquipeAbordagem[t.getEquipeAbordagem().getId()] = new Array<Triagem>();
                            }
                        }
        
                        if ( this.triagensByEquipeAbordagem[t.getEquipeAbordagem().getId()] != undefined &&
                            t.getEquipeAbordagem().getId() > 0 )
                            this.triagensByEquipeAbordagem[t.getEquipeAbordagem().getId()].push( t );
                    }
                } )
            }
        } )
    }

    
    addAcompanhamento() {
        this.acompanhamentoAux = new AcompanhamentoBuilder().initialize( new Acompanhamento( ) );        
        this.openModal();
    }
    
    editAcompanhamento(indexAcompanhamento: number) {
        this.acompanhamentoAux = new AcompanhamentoBuilder().clone(this.acaoAux.getAcompanhamentos()[indexAcompanhamento]);        
        this.flagIndexAcompanhamento = indexAcompanhamento;
        this.flagEditAcompanhamento = true;
        this.openModal();
    }
    
    confirmAddAcompanhamento() {
        if(Util.isNotNull(this.acompanhamentoAux.getDescricao())){
            
            if(this.flagEditAcompanhamento){
                this.acaoAux.getAcompanhamentos()[this.flagIndexAcompanhamento] = this.acompanhamentoAux;
                
            }else{
                this.acompanhamentoAux.setAcao(new AcaoBuilder().clone(this.acaoAux));
                this.acaoAux.getAcompanhamentos().push(new AcompanhamentoBuilder().clone(this.acompanhamentoAux));
            }
        }else{
            this.toastParams = ["Por favor, informe todos os dados corretamente", 4000];
            this.globalActions.emit( 'toast' );
            return;
        }
    }

    removeAcompanhamento(indexAcompanhamento) {
        this.acaoAux.getAcompanhamentos().splice( indexAcompanhamento, 1 )
    }

    encerrarAcao() {
        this.acaoAux.setStatus( this.statusAcoes[1] );
    }
    
    validarAcao() {
        this.acaoAux.setStatus( this.statusAcoes[4] );
    }
    
    validarReavaliacao() {
        if(this.profissional.getEquipe().getId() == this.riscoPotencial.getEquipeResponsavel().getId()){

            //OBTER TODOS OS RISCOS ATUAIS, CUJA EQUIPE DIFERENTE DA EQUIPE DO PROFISSIONAL -> LOOP
            if (this.riscoPotencial.getRiscoEmpregados()
                .filter(r=> r.getEquipe().getId() != this.profissional.getEquipe().getId() && r.getAtivo()
                            && this.riscoPotencial.getEquipes().filter(e=> e.getId() == r.getEquipe().getId()).length > 0
                            && r.getStatus() != "REAVALIADO")
                .length > 0){
                return false;
            }
        }
        
        return this.validarReavaliacaoAbordagem();
    }
    
    validarReavaliacaoAbordagem(){
        let qtdAcoes = 0;
        let ret: boolean = true;
          let riscoEmpregado: RiscoEmpregado = this.riscoPotencial.getRiscoEmpregados()
                  .filter(ri => this.riscoPotencial.getEquipes().filter(e=> e.getId() == ri.getEquipe().getId()).length > 0)
                  .find(x => x.getAtivo() == true && 
                             x.getEquipe().getId() == this.profissional.getEquipe().getId());
          if(riscoEmpregado){
              riscoEmpregado.getTriagens().forEach( t => {
                 t.getAcoes().forEach(a=> {
                     qtdAcoes++;
                     if(a.getStatus()!= this.statusAcoes[4]){
                         ret = false;
                     }
                 }) 
              });
          }
          else{
              ret = false;
          }
                
        return ret && qtdAcoes > 0;
    }

    verifyAcompanhamento() {
        if ( this.acaoAux.getStatus() == this.statusAcoes[1] || 
                this.acaoAux.getStatus() == this.statusAcoes[3] || 
                this.acaoAux.getStatus() == this.statusAcoes[4] )
            return false;
        
        return true;
    }
    
    verifyEncerrarAcompanhamento() {
        if ( this.profissional.getEquipe().getId() != this.triagemAux.getEquipeAbordagem().getId() || 
                this.acaoAux.getStatus() == this.statusAcoes[1] || 
                this.acaoAux.getStatus() == this.statusAcoes[3] ||
                this.acaoAux.getStatus() == this.statusAcoes[4] )
            return false;
        
        return true;
    }
    
    verifyValidarAcompanhamento() {
        if ( this.profissional.getEquipe().getId() == this.riscoPotencial.getEquipeResponsavel().getId() && 
                this.acaoAux.getStatus() == this.statusAcoes[1] )
            return true;
        
        return false;
    }
    
    getIndiceDescricao( triagem: Triagem ) {
        return triagem.getIndice() + " - " + triagem["indicadorSast"]["indice" + triagem.getIndice()];
    }

    openModal() {
        this.modalAcompanhamento.emit( { action: "modal", params: ['open'] } );
    }

    closeModal() {
        this.modalAcompanhamento.emit( { action: "modal", params: ['close'] } );
    }

    ngOnDestroy() {
        $( ".container" ).get( 0 ).style.width = "70%";
        if ( this.inscricao != undefined )
            this.inscricao.unsubscribe();
    }
}
