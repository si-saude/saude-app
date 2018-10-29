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

@Component( {
    selector: 'app-questionario-conhecimento-alimentar-form',
    templateUrl: './questionario-conhecimento-alimentar-form.html',
    styleUrls: ['./questionario-conhecimento-alimentar-form.css', './../../../../assets/css/form-component.css']
} )
export class QuestionarioConhecimentoAlimentarFormComponent extends GenericFormComponent implements OnInit {
    private questionario: QuestionarioConhecimentoAlimentar;
    
    constructor( private route: ActivatedRoute,
        private questionarioConhecimentoAlimentarService: QuestionarioConhecimentoAlimentarService,
        router: Router) {
        super( questionarioConhecimentoAlimentarService, router );

        this.goTo = "questionario-conhecimento-alimentar";
        this.questionario = new QuestionarioConhecimentoAlimentarBuilder().initialize( this.questionario );
    }

    ngOnInit() {
        let c = this;
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
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
                                        this.setBackgroundItens(this.questionario.getRespostas()[i], this.questionario.getRespostas()[i].getItem(), i)
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
        let idAtendimento = this.questionario.getAtendimento().getId();
        this.questionario = new QuestionarioConhecimentoAlimentarBuilder().clone( this.questionario );
        this.questionario.getAtendimento().setId(idAtendimento);
        super.save( this.questionario );
    }
    
    selectItem(resposta: RespostaQuestionarioConhecimentoAlimentar, item: ItemIndicadorConhecimentoAlimentar, r) {
        if ( resposta.getItem() != undefined && item.getId() == resposta.getItem().getId() )
            resposta.setItem(undefined);
        else resposta.setItem(item);
        this.setBackgroundItens(resposta, item, r);
    }
    
    setBackgroundItens(resposta: RespostaQuestionarioConhecimentoAlimentar, item: ItemIndicadorConhecimentoAlimentar, r) {
        let itens = resposta.getIndicador().getItemIndicadorConhecimentoAlimentares();
        for (let i = 0; i < itens.length; i++) {
            if ( resposta.getItem() != undefined && itens[i].getId() == item.getId() )
                $(".item-"+r+"-"+i).css("background-color", "#5e93ff");
            else $(".item-"+r+"-"+i).css("background-color", "#ddd");
        }
    }
    
    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
}