import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Localizacao } from './../../../model/localizacao';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { LocalizacaoBuilder } from './../localizacao.builder';
import { LocalizacaoFilter } from './../localizacao.filter';
import { LocalizacaoService } from './../localizacao.service';

@Component( {
    selector: 'app-localizacao-form',
    templateUrl: './localizacao-form.html',
    styleUrls: ['./localizacao-form.css', './../../../../assets/css/form-component.css']
} )
export class LocalizacaoFormComponent extends GenericFormComponent implements OnInit {
    localizacao: Localizacao;
    
    localizacaoFilter: LocalizacaoFilter = new LocalizacaoFilter();
    
    constructor( private route: ActivatedRoute,
        private localizacaoService: LocalizacaoService,
        router: Router) { 
        super(localizacaoService, router);
        this.goTo = "localizacao";
        
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
                  
    }
    
    save() {
        super.save(new LocalizacaoBuilder().clone(this.localizacao));
    }
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
}
