import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Usuario } from './../../../model/usuario';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeFilter } from './../../profissional-saude/profissional-saude.filter';
import { EmpregadoFilter } from './../../empregado/empregado.filter';
import { PessoaFilter } from './../../pessoa/pessoa.filter';
import { AcaoIntervencaoFilter } from './../../acao-intervencao/acao-intervencao.filter';
import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { BooleanFilter } from './../../../generics/boolean.filter';
import { RiscoPotencialService } from './../risco-potencial.service';
import { Triagem } from './../../../model/triagem';
import { TriagemBuilder } from './../../triagem/triagem.builder';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { EquipeFilter } from './../../equipe/equipe.filter';
import { Acao } from './../../../model/acao';
import { RiscoEmpregado } from './../../../model/risco-empregado';
import { AcaoBuilder } from './../../acao/acao.builder';
import { RiscoPotencial } from './../../../model/risco-potencial';
import { IndicadorSast } from './../../../model/indicador-sast';
import { IndicadorSastBuilder } from './../../indicador-sast/indicador-sast.builder';
import { IndicadorSastFilter } from './../../indicador-sast/indicador-sast.filter';
import { RiscoPotencialBuilder } from './../risco-potencial.builder';
import { RiscoPotencialFilter } from './../risco-potencial.filter';
import { ConfirmSaveComponent } from './../../../includes/confirm-save/confirm-save.component';
import { TextUtil } from './../../../generics/utils/text.util';
import { Util } from './../../../generics/utils/util';
import { ModalAcaoComponent } from './../../../includes/modal-acao/modal-acao.component';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.html',
  styleUrls: ['./acoes.css', './../../../../assets/css/form-component.css']
})
export class AcoesComponent extends GenericFormComponent implements OnInit {
    private equipesAbordagemTriagens: Array<Equipe>;
    private triagens: Array<Triagem>;
    private indicadoresSastAusenteCalculo: Array<IndicadorSast>;
    private triagensByEquipeAbordagem = [[]];
    private riscoPotencial: RiscoPotencial;
    private flagAcao: Acao;
    private tipoAcoes: Array<string>;
    private statusAcoes: Array<string>;
    private tipoContatoAcoes: Array<string>;
    private flagTriagem: Triagem;
    private flagIndexAcao: number = -1;
    private flagEditAcao: boolean ;
    private triagemAux : Triagem;
    private modalAcao = new EventEmitter<string|MaterializeAction>();
    private modalIndicador = new EventEmitter<string|MaterializeAction>();
    private profissional: Profissional;
    private triagemModal: Triagem;
    @ViewChild( ConfirmSaveComponent) confirmSaveComponent: ConfirmSaveComponent;
    private textUtil: TextUtil;
    @ViewChild( ModalAcaoComponent ) modalAcaoComponent: ModalAcaoComponent;
    private prazos: Array<string>;
    
    private activeDiagnostico:boolean;
    private activeEquipe :boolean;
    private activeIntervencao:boolean;
    private innerIdEquipe: number;
    
    private showModalDiagnostico: boolean;
    private showModalIntervencao: boolean;
    private showModalEquipe: boolean;

    model1Params = [
      {
        dismissible: false, 
      }
    ];    
    
    constructor( private route: ActivatedRoute,
            private riscoPotencialService: RiscoPotencialService,
            router: Router ) {
            super( riscoPotencialService, router );
        
            this.goTo = "risco-potencial";
            
            this.equipesAbordagemTriagens = new EquipeBuilder().initializeList(new Array<Equipe>());
            this.riscoPotencial = new RiscoPotencialBuilder().initialize(new RiscoPotencial());
            this.flagAcao = new AcaoBuilder().initialize(new Acao());
            this.profissional = new ProfissionalSaudeBuilder().initialize(new Profissional());
            this.triagemAux = new TriagemBuilder().initialize(new Triagem());
            this.triagemModal = new TriagemBuilder().initialize(new Triagem());
            this.textUtil = new TextUtil();
            this.triagens = new TriagemBuilder().initializeList(undefined);      
            this.indicadoresSastAusenteCalculo = new IndicadorSastBuilder().initializeList(undefined);      
    }
    
    ngOnInit() {
        $( ".container" ).get( 0 ).style.width = "100%";
        let component = this;
        if ( localStorage.getItem( "usuario-id" ) != undefined ) {
            component.riscoPotencialService.getUsuario( Number( localStorage.getItem( "usuario-id" ) ) )
                .then( res => {
                    let usuario: Usuario = new Usuario();
                    usuario = new UsuarioBuilder().clone( res.json() );
                    if ( usuario.getId() > 0 && usuario.getPessoa() != undefined ) {
                        let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                        profissionalFilter.setEmpregado( new EmpregadoFilter() );
                        profissionalFilter.getEmpregado().setPessoa( new PessoaFilter() );
                        profissionalFilter.getEmpregado().getPessoa().setCpf( usuario.getPessoa().getCpf() );
                        
                        component.riscoPotencialService.getProfissional( profissionalFilter )
                            .then( res => {
                                if ( res.json().list[0] != undefined ) {
                                    component.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
                                    this.textUtil.setTextLength(40);
                                    component.inscricao = this.route.params.subscribe(
                                            ( params: any ) => {
                                                if( params['id'] !== undefined ) {
                                                    let id = params['id'];
                                                    component.showPreload = true;
                                                    component.riscoPotencialService.getAcoes( id )
                                                    .then( res => {
                                                        component.showPreload = false;
                                                        component.riscoPotencial = new RiscoPotencialBuilder().clone( res.json() );
                                                        component.getTriagensEquipeAbordagem();
                                                        this.createListTriagem();
                                                        

                                                    } )
                                                    .catch( error => {
                                                        component.showPreload = false;
                                                        component.catchConfiguration( error );
                                                    } )
                                                }
                                            } );
                                    this.getTipoAcao();
                                    this.getStatusAcao();
                                    this.getTipoContatoAcao();
                                    this.getPrazos();     
                                    this.getIndicadoresAusenteCalculo();
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
    
    getTipoAcao() {
        this.riscoPotencialService.getTipoAcao(new RiscoPotencialFilter())
            .then( res => {
                this.tipoAcoes = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    createListTriagem(){
        this.riscoPotencial.getRiscoEmpregados().filter(r => r.getAtivo()).forEach(r=>{
            r.getTriagens().forEach(t => {
                if(t.getEquipeAbordagem() && t.getEquipeAbordagem().getId() > 0 && this.verificarTriagens(t)){
                   this.triagens.push(t);
                   this.sortTriagem();
                }
            });
        });
        
        console.log(this.triagens);
    } 
    
    sortTriagem(){

        this.triagens.sort(function(a, b){
            
            if ( a['equipeAbordagem']['abreviacao'] > b['equipeAbordagem']['abreviacao'] )
                return 1;
            else if ( a['equipeAbordagem']['abreviacao'] < b['equipeAbordagem']['abreviacao'] )
                return -1;
            else return 0;
        });
        
    }
    
    
    getStatusAcao() {
        this.riscoPotencialService.getStatusAcao(new RiscoPotencialFilter())
            .then( res => {
                this.statusAcoes = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    getIndicadoresAusenteCalculo() {
        
        let indicadorSastFilter: IndicadorSastFilter = new IndicadorSastFilter();
        let booleanFilter: BooleanFilter = new BooleanFilter()
        booleanFilter.setValue(1);
        indicadorSastFilter.setAusenteCalculoInterdisciplinar(booleanFilter);
        
        this.riscoPotencialService.getIndicadorSastService().getIndicadoresSasts(indicadorSastFilter)
            .then( res => {
                this.indicadoresSastAusenteCalculo  = new IndicadorSastBuilder().cloneList(res.json());
            } )
            .catch( error => {
                console.log( "Erro ao retornar os indicadores." );
            } )
        
    }
    
    getTipoContatoAcao() {
        this.riscoPotencialService.getTipoContatoAcao(new RiscoPotencialFilter())
            .then( res => {
                this.tipoContatoAcoes = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    save() {
        this.showPreload = true;
        this.canDeactivate = true;
        this.riscoPotencialService.saveAcoes( new RiscoPotencialBuilder().clone( this.riscoPotencial ) )
            .then( res => {
                this.confirmSaveComponent.setGoTo("$*close*$");
                this.processReturn( true, res );                
            } )
            .catch( error => {
                this.processReturn( false, error );
            } )
    }
    
    verificarTriagens(triagem: Triagem){
        
        return ((triagem.getEquipeAbordagem().getId() == this.profissional.getEquipe().getId() ||
                this.riscoPotencial.getEquipeResponsavel().getId() == this.profissional.getEquipe().getId()) &&
                this.riscoPotencial.getEquipes().filter(x => x.getId() == triagem.getEquipeAbordagem().getId()).length > 0);
        
    }
    
    clickAcaoIntervencao() {        
        if(this.profissional.getEquipe().getId() != this.riscoPotencial.getEquipeResponsavel().getId()){           
            let acaoIntervencaoFilter: AcaoIntervencaoFilter = new  AcaoIntervencaoFilter();
                acaoIntervencaoFilter.setEquipe(new EquipeFilter())
                acaoIntervencaoFilter.getEquipe().setId(this.profissional.getEquipe().getId());
          }
    }
    validar() {
        
    }

    selectTriagem( indexTriagem: number ) {
        this.triagemAux.setSelecionado("");
        this.triagemAux = this.triagens[indexTriagem];
        this.triagemAux.setSelecionado("active");
    }
        
    getTriagensEquipeAbordagem() {
        this.riscoPotencial.getRiscoEmpregados().forEach(rE => {
            if ( rE.getAtivo() ) {
                rE.getTriagens().forEach( t => {
                    if ( t.getEquipeAbordagem().getId() > 0 && 
                            this.equipesAbordagemTriagens.find( eA => eA.getId() == t.getEquipeAbordagem().getId() ) == undefined ) {
                        
                        if ( this.riscoPotencial.getEquipes().find( e => e.getId() == t.getEquipeAbordagem().getId() ) != undefined ) {
                            this.equipesAbordagemTriagens.push( t.getEquipeAbordagem() );
                            this.triagensByEquipeAbordagem[t.getEquipeAbordagem().getId()] = new Array<Triagem>();   
                        }
                    }
                    
                    if ( this.triagensByEquipeAbordagem[t.getEquipeAbordagem().getId()] != undefined &&
                            t.getEquipeAbordagem().getId() > 0 )
                        this.triagensByEquipeAbordagem[t.getEquipeAbordagem().getId()].push(t);
                } )
            }
        })
    }
    
    getIndiceDescricao( triagem: Triagem ) {
        let returnIndice = ''
        if(triagem.getIndice() > -1){
            returnIndice = triagem.getIndice() + " - " + triagem["indicadorSast"]["indice" + triagem.getIndice()];           
        }
        else
            returnIndice = triagem.getIndice().toString();
        
        return returnIndice;
    }
    
    addAcao(equipeId, indexTriagem) {
        this.flagAcao = new AcaoBuilder().initialize( new Acao( ) );        
        this.openModal( );
    }
    
    editAcao(indexAcao: number) {
        this.flagAcao = new AcaoBuilder().clone(this.triagemAux.getAcoes()[indexAcao]);        
        this.flagIndexAcao = indexAcao;
        this.flagEditAcao = true;
        this.openModal();
    }
    
    confirmAddAcao() {
        if ( this.flagAcao.getAcaoIntervencao().getDescricao() == "" || this.flagAcao.getTipo() == "" || this.flagAcao.getTipoContato() == "") {
            this.toastParams = ["Por favor, informe todos os dados corretamente", 4000];
            this.globalActions.emit( 'toast' );
            return;
        }  
        if ( this.triagemAux.getAcoes() == undefined ) 
            this.triagemAux.setAcoes(new Array<Acao>());
        this.flagAcao.setStatus(this.statusAcoes[0]);
        
        if ( this.flagEditAcao ) 
            this.triagemAux.getAcoes()[this.flagIndexAcao] = this.flagAcao;
        else 
            this.triagemAux.getAcoes().push(this.flagAcao);
        
        this.flagEditAcao = false;
    }   

    removeAcao(indexAcao: number) {
        
        if ( this.riscoPotencial.getAcoesDelete() == undefined )
            this.riscoPotencial.setAcoesDelete(new AcaoBuilder().initializeList(new Array<Acao>()));
        
        this.riscoPotencial.getAcoesDelete().push(this.triagemAux.getAcoes()[indexAcao]);
        this.triagemAux.getAcoes().splice(indexAcao, 1);
    }
    
    verifyReopenAcao(acao: Acao) {
        if ( acao.getStatus() == "ENCERRADA" )
            return true;
        return false;
    }
    
    verifyStatusAcao(acao: Acao){
        if ( acao.getStatus() == "ABERTA" )
            return true;
        return false;        
    }
    
    reopenAcao(acao: Acao) {
        acao.setStatus("ABERTA");
    }
    openModalIndicador(){
        this.modalIndicador.emit( { action: "modal", params: ['open'] } );
    }
    
    closeModalIndicador() {
        this.modalIndicador.emit( { action: "modal", params: ['close'] } );
    }
    
    openModal() {
        this.modalAcao.emit( { action: "modal", params: ['open'] } );
    }

    closeModal() {        
        this.modalAcao.emit( { action: "modal", params: ['close'] } );
    }
    
    showActions(indexAcao) {
        $(".btn-action"+indexAcao).show();
    }
    
    hiddenActions(indexAcao) {
        $(".btn-action"+indexAcao).hide();
    }
    ngOnDestroy() {
        $( ".container" ).get( 0 ).style.width = "70%";
        if ( this.inscricao != undefined ) 
            this.inscricao.unsubscribe();
    }
    
    colorColumn(triagem : Triagem){        
        if(triagem.getAcoes() == undefined || triagem.getAcoes().length == 0)
           return '#fff'
        else
           return '#FFA500' 
    }
    getPrazos() {
        this.riscoPotencialService.getPrazos()
            .then( res => {
                this.prazos = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( "Erro ao retornar os prazos." );
            } )
    }
    
    openModalDiagnostico() {
        this.activeDiagnostico = true;
        this.activeIntervencao = false;
        this.showModalDiagnostico = true;
        this.activeEquipe = false;
    }
    
    selectDiagnostico( diagnostico) {
        this.triagemModal.setDiagnostico(diagnostico);
        this.showModalDiagnostico = false; 
    }
    
    cancelarModalDiagnostico() {
        this.showModalDiagnostico = false;
    }
    
    openModalIntervencao() {
        this.activeDiagnostico = false;
        this.activeEquipe = false;
        this.activeIntervencao = true;
        this.showModalIntervencao = true;
    }
    
    selectIntervencao( intervencao) {
        this.triagemModal.setIntervencao(intervencao);
        this.showModalIntervencao = false;
    }
    
    cancelarModalIntervencao() {
        this.showModalIntervencao = false;
    }    
    
    setEquipe(){    
       this.innerIdEquipe = this.triagemModal.getIndicadorSast().getEquipe().getId();
    }
    
    cancelarModalEquipe() {
        this.showModalEquipe = false;
    }
    
    selectEquipe( equipe: Equipe ) {
        this.triagemModal.setEquipeAbordagem(equipe);
        this.showModalEquipe = false;
    }
    openModalEquipe() {
        this.showModalEquipe = true;
        this.activeEquipe = true;
        this.activeDiagnostico = false;
        this.activeIntervencao = false;
    }
    
    confirmAddTriagem(){
        if(Util.isNotNull(this.triagemModal.getDiagnostico()) && this.triagemModal.getDiagnostico().getId() > 0 &&
        Util.isNotNull(this.triagemModal.getIntervencao()) && this.triagemModal.getIntervencao().getId() > 0 &&
        Util.isNotNull(this.triagemModal.getEquipeAbordagem()) && this.triagemModal.getEquipeAbordagem().getId() > 0 && 
        Util.isNotNull(this.triagemModal.getPrazo())){
            
            let riscoEmpregado: RiscoEmpregado = this.riscoPotencial.getRiscoEmpregados().find(x=>x.getProfissional().getId() == this.profissional.getId() && x.getAtivo());
            this.triagemModal.setAtendimento(riscoEmpregado.getTriagens()[0].getAtendimento()); 
            let triagemAdd = new TriagemBuilder().clone(this.triagemModal); 
            
            if(!this.riscoPotencial.getEquipes().find(x=> x.getId() == triagemAdd.getEquipeAbordagem().getId()))
                this.riscoPotencial.getEquipes().push(new EquipeBuilder().clone(triagemAdd.getEquipeAbordagem()));
                        
            triagemAdd.setIndicadorSast(this.indicadoresSastAusenteCalculo.find(i=> i.getId() == this.triagemModal.getIndicadorSast().getId()));
            riscoEmpregado.getTriagens().push(triagemAdd);  
            this.triagens.push(triagemAdd);
            this.sortTriagem();            
            this.triagemModal = new TriagemBuilder().initialize(undefined);
        }        
    }
}
