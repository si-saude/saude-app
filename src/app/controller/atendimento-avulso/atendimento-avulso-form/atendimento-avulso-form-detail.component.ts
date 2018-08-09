import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Atendimento } from './../../../model/atendimento';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AtendimentoBuilder } from './../../atendimento/atendimento.builder';
import { AtendimentoService } from './../../atendimento/atendimento.service';

@Component( {
    selector: 'app-atendimento-avulso-form',
    templateUrl: './atendimento-avulso-form.html',
    styleUrls: ['./atendimento-avulso-form.css', './../../../../assets/css/form-component.css']
} )
export class AtendimentoAvulsoFormDetailComponent extends GenericFormComponent implements OnInit { 
   
    atendimento: Atendimento;
    
    constructor( private route: ActivatedRoute,
            private atendimentoService: AtendimentoService,
            router: Router) { 
            super(atendimentoService, router);
            
            this.goTo = "atendimento-avulso";
            this.atendimento = new AtendimentoBuilder().initialize(this.atendimento);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.atendimentoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.atendimento = new AtendimentoBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
    }
    
    save() {
        super.save(new AtendimentoBuilder().clone(this.atendimento));
    }
    
}