import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Localizacao } from './../../../model/localizacao';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { LocalizacaoBuilder } from './../localizacao.builder';
import { LocalizacaoFilter } from './../localizacao.filter';
import { LocalizacaoService } from './../localizacao.service';
import { Servico } from './../../../model/servico';
import { ServicoBuilder } from './../../servico/servico.builder';

@Component( {
    selector: 'app-localizacao-form-detail',
    templateUrl: './localizacao-form-detail.html',
    styleUrls: ['./localizacao-form.css', './../../../../assets/css/form-component.css']
} )
export class LocalizacaoFormDetailComponent extends GenericFormComponent implements OnInit {
    localizacao: Localizacao;
    arrayServico: Array<Servico>;
    selectedRegraAtend = null;    

    localizacaoFilter: LocalizacaoFilter = new LocalizacaoFilter();
    
    constructor( private route: ActivatedRoute,
        private localizacaoService: LocalizacaoService,
        router: Router) { 
        super(localizacaoService, router);
        this.goTo = "localizacao";
        this.arrayServico = new ServicoBuilder().initializeList(new Array<Servico>());

        this.localizacao = new LocalizacaoBuilder().initialize(this.localizacao);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {                
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
            } );
                  
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
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
}
