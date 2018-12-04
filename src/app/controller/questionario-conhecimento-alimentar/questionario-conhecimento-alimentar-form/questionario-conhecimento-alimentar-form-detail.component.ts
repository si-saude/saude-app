import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { QuestionarioConhecimentoAlimentar } from './../../../model/questionario-conhecimento-alimentar';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { QuestionarioConhecimentoAlimentarBuilder } from './../questionario-conhecimento-alimentar.builder';
import { QuestionarioConhecimentoAlimentarService } from './../questionario-conhecimento-alimentar.service';
import { QuestionarioConhecimentoAlimentarUtil } from './../questionario-conhecimento-alimentar.util';

@Component( {
    selector: 'app-questionario-conhecimento-alimentar-form-detail',
    templateUrl: './questionario-conhecimento-alimentar-form-detail.html',
    styleUrls: ['./questionario-conhecimento-alimentar-form.css', './../../../../assets/css/form-component.css']
} )
export class QuestionarioConhecimentoAlimentarFormDetailComponent extends GenericFormComponent implements OnInit {
    private questionario: QuestionarioConhecimentoAlimentar;
    private questionarioUtil: QuestionarioConhecimentoAlimentarUtil;
    private empregado: string;

    constructor( private route: ActivatedRoute,
        private questionarioConhecimentoAlimentarService: QuestionarioConhecimentoAlimentarService,
        router: Router) {
        super( questionarioConhecimentoAlimentarService, router );

        this.goTo = "questionario-conhecimento-alimentar";
        this.questionario = new QuestionarioConhecimentoAlimentarBuilder().initialize( this.questionario );
        this.questionarioUtil = new QuestionarioConhecimentoAlimentarUtil();
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['empregado'] !== undefined )
                    this.empregado = params['empregado'];
                
                let id = params['id'];
                this.showPreload = true;

                this.service.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.questionario = new QuestionarioConhecimentoAlimentarBuilder().clone( res.json() );
                        setTimeout(() => {
                            if ( this.questionario != undefined && this.questionario.getRespostas() != undefined )
                                for ( let i = 0; i < this.questionario.getRespostas().length; i++ )
                                    this.questionarioUtil.setBackgroundItens(this.questionario.getRespostas()[i], this.questionario.getRespostas()[i].getItem(), i)
                        }, 300);
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