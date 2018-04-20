import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { RiscoPotencialService } from './../risco-potencial.service';
import { Triagem } from './../../../model/triagem';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { Acao } from './../../../model/acao';
import { AcaoBuilder } from './../../acao/acao.builder';
import { Tarefa } from './../../../model/tarefa';
import { RiscoPotencial } from './../../../model/risco-potencial';
import { RiscoPotencialBuilder } from './../risco-potencial.builder';
import { RiscoPotencialFilter } from './../risco-potencial.filter';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.html',
  styleUrls: ['./acoes.css', './../../../../assets/css/form-component.css']
})
export class AcoesComponent extends GenericFormComponent implements OnInit {
    private equipesAbordagemTriagens: Array<Equipe>;
    private triagensByEquipeAbordagem = [[]];
    private riscoPotencial: RiscoPotencial;
    private acao: Acao;
    private tipoAcoes: Array<string>;
    private statusAcoes: Array<string>;
    private tipoContatoAcoes: Array<string>;
    private dataTarefaAcao: any;
    private dataAcoes = [[]];
    private flagTriagem: Triagem;
    private flagIndexAcao: number = -1;
    private modalAcao;

    constructor( private route: ActivatedRoute,
            private riscoPotencialService: RiscoPotencialService,
            router: Router ) {
            super( riscoPotencialService, router );
        
            this.goTo = "risco-potencial";
            
            this.equipesAbordagemTriagens = new EquipeBuilder().initializeList(new Array<Equipe>());
            this.riscoPotencial = new RiscoPotencialBuilder().initialize(new RiscoPotencial());
            this.modalAcao = new EventEmitter<string | MaterializeAction>();
            this.acao = new AcaoBuilder().initialize(new Acao());
    }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.riscoPotencialService.getAcoes( id )
                        .then( res => {
                            this.showPreload = false;
                            this.riscoPotencial = new RiscoPotencialBuilder().clone( res.json() );
                            this.getTriagensEquipeAbordagem();
                            this.getDataTarefaAcoes();
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
    
    getStatusAcao() {
        this.riscoPotencialService.getStatusAcao(new RiscoPotencialFilter())
            .then( res => {
                this.statusAcoes = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
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
                this.processReturn( true, res );
            } )
            .catch( error => {
                this.processReturn( false, error );
            } )
    }
    
    validar() {
        
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
    
    getDataTarefaAcoes() {
        this.riscoPotencial.getRiscoEmpregados().forEach(rE =>{
            rE.getTriagens().forEach(t => {
                t.getAcoes().forEach(a => {
                    if ( this.dataAcoes[t.getId()] == undefined )
                        this.dataAcoes[t.getId()] = new Array<any>();
                    let data = this.addFormattedDate(a.getTarefa().getFim());
                    this.dataAcoes[t.getId()].push(data);
                });
            });
        });
    }
    
    addFormattedDate( data: any ) {
        if ( data === undefined || data === null ) {
            return undefined;
        }
        let s = data.split( "T" );
        let datas = s[0].split( "-" );
        let st = datas[2] + "/" + datas[1] + "/" + datas[0];
        let o = { formatted: st };
        return o;
    }
    
    adjustDataAcoes() {
//        this.equipesAbordagemTriagens.forEach(eA => { 
//            this.triagensByEquipeAbordagem[eA.getId()].forEach(tE => {
//                for ( let i = 0; i < tE.length; i++ ) {
//                    
//                }
//            })
//        })
    }
    
    getIndiceDescricao( triagem: Triagem ) {
        return triagem.getIndice() + " - " + triagem["indicadorSast"]["indice" + triagem.getIndice()];
    }
    
    addAcao(equipeId, indexTriagem) {
        this.acao = new AcaoBuilder().initialize( new Acao( ) );
        
        this.flagTriagem = this.triagensByEquipeAbordagem[equipeId][indexTriagem];
        this.flagIndexAcao = -1;
        
        this.dataTarefaAcao = null;
        this.openModal( );
    }
    
    editAcao( equipeId, indexTriagem, triagemId, indexAcao ) {
        let triagem: Triagem = this.triagensByEquipeAbordagem[equipeId][indexTriagem];
        this.dataTarefaAcao = this.dataAcoes[triagemId][indexAcao];
        this.acao = triagem.getAcoes()[indexAcao];
        
        this.flagTriagem = this.triagensByEquipeAbordagem[equipeId][indexTriagem];
        this.flagIndexAcao = indexAcao;
        
        this.openModal();
    }
    
    confirmAddAcao() {
        if ( this.dataTarefaAcao == null || this.acao.getDetalhe() == "" || 
                this.acao.getTipo() == "" || this.acao.getTipoContato() == "") {
            this.toastParams = ["Por favor, informe todos os dados corretamente", 4000];
            this.globalActions.emit( 'toast' );
            return;
        }
        
        let triagem: Triagem = this.flagTriagem;
        
        if ( this.flagIndexAcao > -1 ) {
            this.dataAcoes[triagem.getId()][this.flagIndexAcao] = this.dataTarefaAcao;
            this.acao.getTarefa().setFim(this.parseDatePickerToDate(this.dataTarefaAcao));
            return;
        }
        
        if ( this.dataAcoes[triagem.getId()] == undefined )
            this.dataAcoes[triagem.getId()] = new Array<any>();
       
        this.dataAcoes[triagem.getId()][this.dataAcoes[triagem.getId()].length] = this.dataTarefaAcao;
        
        if ( triagem.getAcoes() == undefined ) 
            triagem.setAcoes(new Array<Acao>());
        
        this.acao.setTarefa(new Tarefa());
        this.acao.setStatus(this.statusAcoes[0]);
        this.acao.getTarefa().setFim(this.parseDatePickerToDate(this.dataTarefaAcao));
        
        triagem.getAcoes().push(this.acao);
    }
    
    removeAcao( equipeId, indexTriagem, triagemId, indexAcao ) {
        let triagem: Triagem = this.triagensByEquipeAbordagem[equipeId][indexTriagem];
        this.dataAcoes[triagemId].splice(indexAcao, 1);
        
        if ( this.riscoPotencial.getAcoesDelete() == undefined )
            this.riscoPotencial.setAcoesDelete(new AcaoBuilder().initializeList(new Array<Acao>()));
        this.riscoPotencial.getAcoesDelete().push(triagem.getAcoes()[indexAcao]);
        
        triagem.getAcoes().splice(indexAcao, 1);
    }
    
    verifyReopenAcao(acao: Acao) {
        if ( acao.getStatus() == "ENCERRADA" )
            return true;
        return false;
    }
    
    reopenAcao(acao: Acao) {
        acao.setStatus("ABERTA");
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
        if ( this.inscricao != undefined ) 
            this.inscricao.unsubscribe();
    }
}
