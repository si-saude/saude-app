import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { AcaoIntervencao } from './../../../model/acao-intervencao';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AcaoIntervencaoBuilder } from './../acao-intervencao.builder';
import { AcaoIntervencaoService } from './../acao-intervencao.service';
import { Equipe } from './../../../model/equipe';

@Component( {
    selector: 'app-acao-intervencao-form-detail',
    templateUrl: './acao-intervencao-form-detail.html',
    styleUrls: ['./acao-intervencao-form.css', './../../../../assets/css/form-component.css']
} )
export class AcaoIntervencaoFormDetailComponent extends GenericFormComponent implements OnInit {
    private acaoIntervencao: AcaoIntervencao;
    private equipes: Array<Equipe>;

    constructor( private route: ActivatedRoute,
        private acaoIntervencaoService: AcaoIntervencaoService,
        router: Router) {
        super( acaoIntervencaoService, router );

        this.goTo = "acao-intervencao";
        this.acaoIntervencao = new AcaoIntervencaoBuilder().initialize( this.acaoIntervencao );
        this.equipes = new Array<Equipe>();
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.service.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.acaoIntervencao = new AcaoIntervencaoBuilder().clone( res.json() );
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        this.getEquipes();
    }
    
    getEquipes() {
        this.acaoIntervencaoService.getEquipeService().getEquipes()
            .then( res => {
                this.equipes = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    save() {
        super.save( new AcaoIntervencaoBuilder().clone( this.acaoIntervencao ) );
    }
}