import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { AvaliacaoHigieneOcupacional } from './../../../model/avaliacao-higiene-ocupacional';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AvaliacaoHigieneOcupacionalBuilder } from './../avaliacao-higiene-ocupacional.builder';
import { AvaliacaoHigieneOcupacionalService } from './../avaliacao-higiene-ocupacional.service';
import { Atendimento } from './../../../model/atendimento';
import { AtendimentoBuilder } from './../../atendimento/atendimento.builder';

@Component( {
    selector: 'app-avaliacao-higiene-ocupacional-form',
    templateUrl: './avaliacao-higiene-ocupacional-form.html',
    styleUrls: ['./avaliacao-higiene-ocupacional-form.css', './../../../../assets/css/form-component.css']
} )
export class AvaliacaoHigieneOcupacionalFormComponent extends GenericFormComponent implements OnInit {
    
    private atendimento: Atendimento;
    
    constructor( private route: ActivatedRoute,
        private avaliacaoHigieneOcupacionalService: AvaliacaoHigieneOcupacionalService,
        router: Router) {
        super( avaliacaoHigieneOcupacionalService, router );

        this.goTo = "avaliacao-higiene-ocupacional";
        this.atendimento = new AtendimentoBuilder().initialize(this.atendimento);
        
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;     
                    
                    this.avaliacaoHigieneOcupacionalService.getAvaliacaoAtendimento( id )
                        .then( res => {
                            this.showPreload = false;
                            this.atendimento = new AtendimentoBuilder().clone( res.json() );
                          } )
                         .catch( error => {
                            this.catchConfiguration( error );
                        } )
                } 
            } );
    }
    

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    save() {
        super.save( new AvaliacaoHigieneOcupacionalBuilder().clone( this.atendimento.getAvaliacaoHigieneOcupacional()));
    }
    
    
}