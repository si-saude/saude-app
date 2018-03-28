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

                    this.riscoPotencialService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.riscoPotencial = new RiscoPotencialBuilder().clone( res.json() );
                            console.log(this.riscoPotencial);
                            this.getTriagensEquipeAbordagem();
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
        super.save( new RiscoPotencialBuilder().clone( this.riscoPotencial ) );
    }
    
    validar() {
        
    }
    
    getTriagensEquipeAbordagem() {
        this.riscoPotencial.getRiscoEmpregados().forEach(rE => {
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
        })
    }
    
    getDataTarefaAcoes() {
        
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
        
        this.dataTarefaAcao = null;
        this.openModal( );
    }
    
    confirmAddAcao() {
        if ( this.dataTarefaAcao == null || this.acao.getDetalhe() == "" || 
                this.acao.getTipo() == "" || this.acao.getTipoContato() == "") {
            this.toastParams = ["Por favor, informe todos os dados corretamente", 4000];
            this.globalActions.emit( 'toast' );
            return;
        }
        
        let triagem: Triagem = this.flagTriagem;
        
        if ( this.dataAcoes[triagem.getId()] == undefined )
            this.dataAcoes[triagem.getId()] = new Array<any>();
        
        this.dataAcoes[triagem.getId()][this.dataAcoes[triagem.getId()].length] = this.dataTarefaAcao;
        
        if ( triagem.getAcoes() == undefined ) 
            triagem.setAcoes(new Array<Acao>());
        
        this.acao.setStatus(this.statusAcoes[0]);
        this.acao.setTarefa(new Tarefa());
        this.acao.getTarefa().setFim(this.parseDatePickerToDate(this.dataTarefaAcao));
        
        triagem.getAcoes().push(this.acao);
    }
    
    removeAcao( equipeId, indexTriagem, triagemId, indexAcao ) {
        let triagem: Triagem = this.triagensByEquipeAbordagem[equipeId][indexTriagem];
        this.dataAcoes[triagemId].splice(indexAcao, 1);
        triagem.getAcoes().splice(indexAcao, 1);
    }
    
    openModal() {
        this.modalAcao.emit( { action: "modal", params: ['open'] } );
    }

    closeModal() {
        this.modalAcao.emit( { action: "modal", params: ['close'] } );
    }
    
    showDelete(indexAcao) {
        $(".btn-remove"+indexAcao).show();
    }
    
    hiddenDelete(indexAcao) {
        $(".btn-remove"+indexAcao).hide();
    }
    
    ngOnDestroy() {
        if ( this.inscricao != undefined ) 
            this.inscricao.unsubscribe();
    }
}
