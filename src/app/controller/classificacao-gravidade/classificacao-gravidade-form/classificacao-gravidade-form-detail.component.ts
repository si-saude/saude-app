import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { ClassificacaoGravidade } from './../../../model/classificacao-gravidade';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { ClassificacaoGravidadeBuilder } from './../classificacao-gravidade.builder';
import { ClassificacaoGravidadeService } from './../classificacao-gravidade.service';

@Component( {
    selector: 'app-classificacao-gravidade-form-detail',
    templateUrl: './classificacao-gravidade-form-detail.html',
    styleUrls: ['./classificacao-gravidade-form.css', './../../../../assets/css/form-component.css']
} )
export class ClassificacaoGravidadeFormDetailComponent extends GenericFormComponent implements OnInit {
    classificacaoGravidade: ClassificacaoGravidade;

    constructor( private route: ActivatedRoute,
        private classificacaoGravidadeService: ClassificacaoGravidadeService,
        router: Router) {
        super( classificacaoGravidadeService, router );

        this.goTo = "classificacao-gravidade";
        this.classificacaoGravidade = new ClassificacaoGravidadeBuilder().initialize( this.classificacaoGravidade );
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.classificacaoGravidadeService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.classificacaoGravidade = new ClassificacaoGravidadeBuilder().clone( res.json() );
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );

    }

}