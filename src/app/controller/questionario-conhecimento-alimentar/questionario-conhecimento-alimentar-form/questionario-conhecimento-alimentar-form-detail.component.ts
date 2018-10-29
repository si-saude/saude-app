import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { QuestionarioConhecimentoAlimentar } from './../../../model/questionario-conhecimento-alimentar';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { QuestionarioConhecimentoAlimentarBuilder } from './../questionario-conhecimento-alimentar.builder';
import { QuestionarioConhecimentoAlimentarService } from './../questionario-conhecimento-alimentar.service';

@Component( {
    selector: 'app-questionario-conhecimento-alimentar-form-detail',
    templateUrl: './questionario-conhecimento-alimentar-form-detail.html',
    styleUrls: ['./questionario-conhecimento-alimentar-form.css', './../../../../assets/css/form-component.css']
} )
export class QuestionarioConhecimentoAlimentarFormDetailComponent extends GenericFormComponent implements OnInit {
    questionarioConhecimentoAlimentar: QuestionarioConhecimentoAlimentar;

    constructor( private route: ActivatedRoute,
        private questionarioConhecimentoAlimentarService: QuestionarioConhecimentoAlimentarService,
        router: Router) {
        super( questionarioConhecimentoAlimentarService, router );

        this.goTo = "questionarioConhecimentoAlimentar";
        this.questionarioConhecimentoAlimentar = new QuestionarioConhecimentoAlimentarBuilder().initialize( this.questionarioConhecimentoAlimentar );
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.service.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.questionarioConhecimentoAlimentar = new QuestionarioConhecimentoAlimentarBuilder().clone( res.json() );
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