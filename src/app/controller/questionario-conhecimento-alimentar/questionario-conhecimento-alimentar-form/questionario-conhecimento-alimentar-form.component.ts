import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { QuestionarioConhecimentoAlimentar } from './../../../model/questionario-conhecimento-alimentar';
import { ItemIndicadorConhecimentoAlimentar } from './../../../model/item-indicador-conhecimento-alimentar';
import { RespostaQuestionarioConhecimentoAlimentar } from './../../../model/resposta-questionario-conhecimento-alimentar';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { QuestionarioConhecimentoAlimentarBuilder } from './../questionario-conhecimento-alimentar.builder';
import { QuestionarioConhecimentoAlimentarService } from './../questionario-conhecimento-alimentar.service';
import { QuestionarioConhecimentoAlimentarUtil } from './../questionario-conhecimento-alimentar.util';

@Component( {
    selector: 'app-questionario-conhecimento-alimentar-form',
    templateUrl: './questionario-conhecimento-alimentar-form.html',
    styleUrls: ['./questionario-conhecimento-alimentar-form.css', './../../../../assets/css/form-component.css']
} )
export class QuestionarioConhecimentoAlimentarFormComponent extends GenericFormComponent implements OnInit {
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
        let c = this;
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    if ( params['empregado'] !== undefined )
                        this.empregado = params['empregado'];
                    
                    let id = params['id'];
                    this.showPreload = true;

                    this.service.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.questionario = new QuestionarioConhecimentoAlimentarBuilder().clone( res.json() );
                            this.questionario.getAtendimento().setId(res.json()['atendimento']['id']);
                            setTimeout(() => {
                                if ( this.questionario != undefined && this.questionario.getRespostas() != undefined )
                                    for ( let i = 0; i < this.questionario.getRespostas().length; i++ )
                                        this.questionarioUtil.setBackgroundItens(this.questionario.getRespostas()[i], this.questionario.getRespostas()[i].getItem(), i)
                            }, 300);
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                } else if ( params['atendimento_id'] !== undefined ) {
                    let id = params['atendimento_id'];
                    this.showPreload = true;

                    this.questionarioConhecimentoAlimentarService.constructQuestionario( id )
                        .then( res => {
                            this.showPreload = false;
                            this.questionario = new QuestionarioConhecimentoAlimentarBuilder().clone( res.json() );
                            this.questionario.getAtendimento().setId(id);
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
    }
    
    save() {
       
        if(this.questionario.getRespostas().filter(x=> x.getItem() == undefined || x.getItem().getCerto() == undefined).length > 0)
            this.processReturn( false, "Responda todas as perguntas");
        else{
            let idAtendimento = this.questionario.getAtendimento().getId();
            this.questionario = new QuestionarioConhecimentoAlimentarBuilder().clone( this.questionario );
            this.questionario.getAtendimento().setId(idAtendimento);
            super.save( this.questionario );            
        }
        
    }
    
    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
}