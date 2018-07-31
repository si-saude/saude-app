import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { AgenteCausador } from './../../../model/agente-causador';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AgenteCausadorBuilder } from './../agente-causador.builder';
import { AgenteCausadorService } from './../agente-causador.service';

@Component( {
    selector: 'app-agente-causador-form-detail',
    templateUrl: './agente-causador-form-detail.html',
    styleUrls: ['./agente-causador-form.css', './../../../../assets/css/form-component.css']
} )
export class AgenteCausadorFormDetailComponent extends GenericFormComponent implements OnInit {
    agenteCausador: AgenteCausador;

    constructor( private route: ActivatedRoute,
        private agenteCausadorService: AgenteCausadorService,
        router: Router) {
        super( agenteCausadorService, router );

        this.goTo = "agente-causador";
        this.agenteCausador = new AgenteCausadorBuilder().initialize( this.agenteCausador );
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.service.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.agenteCausador = new AgenteCausadorBuilder().clone( res.json() );
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }

}