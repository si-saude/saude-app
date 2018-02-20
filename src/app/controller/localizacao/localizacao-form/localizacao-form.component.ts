import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Localizacao } from './../../../model/localizacao';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { LocalizacaoBuilder } from './../localizacao.builder';
import { LocalizacaoFilter } from './../localizacao.filter';
import { LocalizacaoService } from './../localizacao.service';
import { RegraAtendimento } from './../../../model/regra-atendimento';
import { RegraAtendimentoBuilder } from './../../regra-atendimento/regra-atendimento.builder';
import { RegraAtendimentoLocalizacao } from './../../../model/regra-atendimento-localizacao';
import { RegraAtendimentoLocalizacaoBuilder } from './../../regra-atendimento-localizacao/regra-atendimento-localizacao.builder';
import { Servico } from './../../../model/servico';
import { ServicoBuilder } from './../../servico/servico.builder';

@Component( {
    selector: 'app-localizacao-form',
    templateUrl: './localizacao-form.html',
    styleUrls: ['./localizacao-form.css', './../../../../assets/css/form-component.css']
} )
export class LocalizacaoFormComponent extends GenericFormComponent implements OnInit {
    localizacao: Localizacao;
    regraAtendimentos: Array<RegraAtendimento>;
    servicos: Array<Servico>;
    arrayServico: Array<Servico>;
    selectedRegraAtend = null;
    
    localizacaoFilter: LocalizacaoFilter = new LocalizacaoFilter();
    
    constructor( private route: ActivatedRoute,
        private localizacaoService: LocalizacaoService,
        router: Router) { 
        super(localizacaoService, router);
        this.goTo = "localizacao";
        this.regraAtendimentos = new RegraAtendimentoBuilder().initializeList(new Array<RegraAtendimento>());
        this.servicos = new ServicoBuilder().initializeList(new Array<Servico>());
        this.arrayServico = new ServicoBuilder().initializeList(new Array<Servico>());
        
        this.localizacao = new LocalizacaoBuilder().initialize(this.localizacao);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.localizacaoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.localizacao = new LocalizacaoBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getRegraAtendimentos();
        this.getServicos();
    }
    
    getRegraAtendimentos() {
        this.localizacaoService.getRegraAtendimentos()
            .then(res => {
                this.regraAtendimentos = new RegraAtendimentoBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao retornar as regras de atendimento");
            })
    }
    
    getServicos() {
        this.localizacaoService.getServicos()
            .then(res => {
                this.servicos = new ServicoBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao retornar os servicos");
            })
    }
    
    addRegraAtendimento(id) {
        let rA = this.localizacao.getRegraAtendimentoLocalizacoes().find(rAL => rAL.getRegraAtendimento().getId() == id);
        if ( rA != undefined ) {
            this.toastParams = ['Regra de atendimento adicionada anteriormente', 4000];
            this.globalActions.emit('toast');
        } else if (id == 0) {
            this.toastParams = ['Por favor, selecione uma regra de atendimento', 4000];
            this.globalActions.emit('toast');
        } else {
            let regraAtendimento = this.regraAtendimentos.find(o => o.getId() == id);
            let regraAtendimentoLocalizacao = new RegraAtendimentoLocalizacaoBuilder().initialize(new RegraAtendimentoLocalizacao());
            regraAtendimentoLocalizacao.setRegraAtendimento(regraAtendimento);
            regraAtendimentoLocalizacao.setServicos(new ServicoBuilder().initializeList(new Array<Servico>()));
            
            this.localizacao.getRegraAtendimentoLocalizacoes().push(regraAtendimentoLocalizacao);
        }
    }
    
    removeRegraAtendimento(index) {
        this.localizacao.getRegraAtendimentoLocalizacoes().splice(index, 1);
    }
    
    selectRegraAtendimento(index) {
        this.selectedRegraAtend = this.localizacao.getRegraAtendimentoLocalizacoes()[index].getRegraAtendimento();
        this.arrayServico = this.localizacao.getRegraAtendimentoLocalizacoes()[index].getServicos();
    }
    
    selectedRegraAtendimento(index) {
        if ( this.localizacao.getRegraAtendimentoLocalizacoes()[index].getRegraAtendimento() === this.selectedRegraAtend ) {
            return "active";
        } else return "";
    }
    
    addServico(id) {
        let s = this.arrayServico.find(a => a.getId() == id);
        if ( s != undefined ) {
            this.toastParams = ['Servico adicionado anteriormente', 4000];
            this.globalActions.emit('toast');
        } else if ( this.selectedRegraAtend === null ) { 
            this.toastParams = ['Por favor, escolha uma regra de atendimento', 4000];
            this.globalActions.emit('toast');
        } else {
            let servico = this.servicos.find(o => o.getId() == id);
            this.arrayServico.push(servico);
        }
    }
    
    removeServico(index) {
        this.arrayServico.splice(index, 1);
    }
    
    save() {
        super.save(new LocalizacaoBuilder().clone(this.localizacao));
    }
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
}
