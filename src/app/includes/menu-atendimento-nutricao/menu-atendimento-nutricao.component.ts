import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Util } from './../../generics/utils/util';
import { ItemRefeicaoPlano } from './../../model/item-refeicao-plano';
import { RefeicaoPlano } from './../../model/refeicao-plano';
import { Atendimento } from './../../model/atendimento';
import { Recordatorio } from './../../model/recordatorio';
import { PlanoAlimentar } from './../../model/plano-alimentar';
import { QuestionarioConhecimentoAlimentar } from './../../model/questionario-conhecimento-alimentar';
import { RecordatorioBuilder } from './../../controller/recordatorio/recordatorio.builder'
import { AlimentoBuilder } from './../../controller/alimento/alimento.builder'
import { RecordatorioFilter } from './../../controller/recordatorio/recordatorio.filter';
import { PlanoAlimentarBuilder } from './../../controller/plano-alimentar/plano-alimentar.builder';
import { PlanoAlimentarFilter } from './../../controller/plano-alimentar/plano-alimentar.filter';
import { QuestionarioConhecimentoAlimentarBuilder } from './../../controller/questionario-conhecimento-alimentar/questionario-conhecimento-alimentar.builder';
import { QuestionarioConhecimentoAlimentarFilter } from './../../controller/questionario-conhecimento-alimentar/questionario-conhecimento-alimentar.filter';
import { AtendimentoFilter } from './../../controller/atendimento/atendimento.filter';

@Component( {
    selector: 'app-menu-atendimento-nutricao',
    templateUrl: './menu-atendimento-nutricao.html',
    styleUrls: ['./menu-atendimento-nutricao.css']
} )
export class MenuAtendimentoNutricaoComponent{
    @Input() atendimento: Atendimento;
    @Input()  service;
    @Output() btnNovoQuestionario = new EventEmitter<boolean>();
    @Output() btnNovoRecordatorio = new EventEmitter<boolean>();
    @Output() btnNovoPlanoAlimentar = new EventEmitter<boolean>();
    @Output() btnCarregar = new EventEmitter<boolean>();
    
    constructor() {}
    
    newQuestionario() {
        this.btnNovoQuestionario.emit(true);
    }
    
    newRecordatorio() {
        this.btnNovoRecordatorio.emit(true);
    }
    
    newPlanoAlimentar() {
        this.btnNovoPlanoAlimentar.emit(true);
    }
    
    //RECEBE O INDICATIVO DE QUE DEVE SER REDIRECIONADO OU NAO PARA A PAGINA DE NOVO QUESTIONARIO
    //CASO TRUE, NAO REDIRECIONA, CASO CONTRARIO, REDIRECIONA
    callBtnNewQuestionario() {
        let questionarioConhecimentoAlimentar : QuestionarioConhecimentoAlimentar = new QuestionarioConhecimentoAlimentarBuilder().initialize(new QuestionarioConhecimentoAlimentar());
        let questionarioConhecimentoAlimentarFilter : QuestionarioConhecimentoAlimentarFilter = new QuestionarioConhecimentoAlimentarFilter(); 
        questionarioConhecimentoAlimentarFilter.setAtendimento(new AtendimentoFilter())
        questionarioConhecimentoAlimentarFilter.getAtendimento().setId(this.atendimento.getId())
        
        this.service.getQuestionarioService().verifyQuestionario(questionarioConhecimentoAlimentarFilter).then( res => {
        questionarioConhecimentoAlimentar =  new QuestionarioConhecimentoAlimentarBuilder().clone(res.json()); 
        if(questionarioConhecimentoAlimentar.getId() > 0) 
            window.open('/questionario-conhecimento-alimentar/editar/'+questionarioConhecimentoAlimentar.getId()+"/"+
                    this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getNome())      
        else
            window.open('/questionario-conhecimento-alimentar/cadastrar/'+this.atendimento.getId()+"/"+
                    this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getNome()); 
        }).catch(error => {
          console.log("Erro ao retornar Questionario.");
        });
    }
    
  //RECEBE O INDICATIVO DE QUE DEVE SER REDIRECIONADO OU NAO PARA A PAGINA DE NOVO QUESTIONARIO
    //CASO TRUE, NAO REDIRECIONA, CASO CONTRARIO, REDIRECIONA    
    callBtnNewRecordatorio() {
        let recordatorio: Recordatorio = new RecordatorioBuilder().initialize(new Recordatorio());
        let recordatorioFilter : RecordatorioFilter = new RecordatorioFilter(); 
        recordatorioFilter.setAtendimento(new AtendimentoFilter);
        recordatorioFilter.getAtendimento().setId(this.atendimento.getId());
        
        this.service.getRecordatorioService().verifyRecordatorio(recordatorioFilter).then( res => {
            recordatorio =  new RecordatorioBuilder().clone(res.json()); 
            if(recordatorio.getId() > 0) 
                window.open('/recordatorio/editar/'+recordatorio.getId()+"/"+
                        this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getNome())      
            else
                window.open('/recordatorio/cadastrar/'+this.atendimento.getId()+"/"+
                        this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getNome());   
          }).catch(error => {
              console.log("Erro ao retornar Recordatorio.");
          });
    }
    
    callBtnNewPlanoAlimentar() {
        let recordatorio: Recordatorio = new RecordatorioBuilder().initialize(new Recordatorio());
        let recordatorioFilter : RecordatorioFilter = new RecordatorioFilter(); 
        recordatorioFilter.setAtendimento(new AtendimentoFilter);
        recordatorioFilter.getAtendimento().setId(this.atendimento.getId());
        this.service.getRecordatorioService().verifyRecordatorioAlimento(recordatorioFilter).then(r=>{
            recordatorio  =  new RecordatorioBuilder().clone(r.json());         
            
            
            let planoAlimentar : PlanoAlimentar = new PlanoAlimentarBuilder().initialize(new PlanoAlimentar());
            let planoAlimentarFilter : PlanoAlimentarFilter = new PlanoAlimentarFilter(); 
            planoAlimentarFilter.setAtendimento(new AtendimentoFilter);
            planoAlimentarFilter.getAtendimento().setId(this.atendimento.getId());       
            this.service.getPlanoAlimentarService().verifyPlanoAlimentar(planoAlimentarFilter).then(p=>{
                planoAlimentar = new PlanoAlimentarBuilder().clone(p.json());
                console.log("aqui plano",planoAlimentar.getId());
                if(planoAlimentar.getId() > 0){
                    window.open('/plano-alimentar/editar/'+planoAlimentar.getId()+"/"+
                            this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getNome())
                }
                else{
                    
                    if(Util.isNotNull(recordatorio) &&  recordatorio.getId() > 0){
                        planoAlimentar = new PlanoAlimentarBuilder().initialize(new PlanoAlimentar());
                        planoAlimentar.setNe(recordatorio.getNe());
                        planoAlimentar.setTmb(recordatorio.getTmb());
                        planoAlimentar.setAtendimento(new Atendimento())
                        planoAlimentar.getAtendimento().setId(this.atendimento.getId());
                        planoAlimentar.setRefeicoes(new Array<RefeicaoPlano>());
                            recordatorio.getRefeicoes().forEach(x=>
                            {
                                let ref = new RefeicaoPlano(); 
                                
                                ref.setNome(x.getNome());
                                ref.setSomatorio(x.getSomatorio());
                                ref.setItens(new Array<ItemRefeicaoPlano>());
                                
                                x.getItens().forEach(i=>{
                                    let itemRef = new ItemRefeicaoPlano();
                                    itemRef.setAlimento(new AlimentoBuilder().clone(i.getAlimento()));                          
                                    itemRef.setMedidaCaseira(i.getMedidaCaseira());
                                    itemRef.setQuantidade(Util.treatDouble(i.getQuantidade()));
                                    itemRef.setVe(i.getVe());
                                    ref.getItens().push(itemRef);
                                });       
                                
                                planoAlimentar.getRefeicoes().push(ref);
                            });
                            localStorage.setItem("plano", JSON.stringify(planoAlimentar));
                    }                
                    window.open('/plano-alimentar/cadastrar/'+this.atendimento.getId()+"/"+
                            this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getNome()); 
                    }
                });
            
            
            
        });
        
    }
    
    verifyAtendimentoIsNull(){
        if(Util.isNotNull(this.atendimento) && Util.isNotNull(this.atendimento.getFilaAtendimentoOcupacional()) &&
                Util.isNotNull(this.atendimento.getFilaAtendimentoOcupacional().getStatus()) && 
                 (this.atendimento.getFilaAtendimentoOcupacional().getStatus().includes("EM ATENDIMENTO") ||
                  this.atendimento.getFilaAtendimentoOcupacional().getStatus().includes("AMENTO DE INFORMA")))
            return false;
        else 
            return true;
        
    }
    
    functionLoad() {
        this.btnCarregar.emit(true);
    }
}