import { QuestionarioConhecimentoAlimentar } from './../../model/questionario-conhecimento-alimentar';
import { Atendimento } from './../../model/atendimento';
import { AtendimentoBuilder } from './../atendimento/atendimento.builder';
import { RespostaQuestionarioConhecimentoAlimentarBuilder } from './../resposta-questionario-conhecimento-alimentar/resposta-questionario-conhecimento-alimentar.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class QuestionarioConhecimentoAlimentarBuilder extends GenericBuilder {

    initialize(questionarioConhecimentoAlimentar: QuestionarioConhecimentoAlimentar) {
        questionarioConhecimentoAlimentar = new QuestionarioConhecimentoAlimentar();
        questionarioConhecimentoAlimentar.setAtendimento(new Atendimento());
        questionarioConhecimentoAlimentar.setRespostas(
                new RespostaQuestionarioConhecimentoAlimentarBuilder().initializeList(undefined));
        return questionarioConhecimentoAlimentar;
    }
    
    initializeList(questionarioConhecimentoAlimentares: Array<QuestionarioConhecimentoAlimentar>) {
        
        let array:Array<QuestionarioConhecimentoAlimentar> = new Array<QuestionarioConhecimentoAlimentar>();
        
        if(questionarioConhecimentoAlimentares === null || questionarioConhecimentoAlimentares === undefined)
            questionarioConhecimentoAlimentares = new Array<QuestionarioConhecimentoAlimentar>();
        
        for (let questionarioConhecimentoAlimentar of questionarioConhecimentoAlimentares) {
            array.push(this.initialize(questionarioConhecimentoAlimentar));
        }
        
        return array;
    }
    
    clone(questionarioConhecimentoAlimentar: QuestionarioConhecimentoAlimentar): QuestionarioConhecimentoAlimentar {
        
        if (questionarioConhecimentoAlimentar === null || questionarioConhecimentoAlimentar === undefined)
            questionarioConhecimentoAlimentar = new QuestionarioConhecimentoAlimentar();
        
        let cloneQuestionarioConhecimentoAlimentar = new QuestionarioConhecimentoAlimentar();
        cloneQuestionarioConhecimentoAlimentar.setId(this.getValue(questionarioConhecimentoAlimentar,"getId"));
        cloneQuestionarioConhecimentoAlimentar.setVersion(this.getValue(questionarioConhecimentoAlimentar, "getVersion"));
        cloneQuestionarioConhecimentoAlimentar.setAtendimento(new Atendimento());
        cloneQuestionarioConhecimentoAlimentar.setRespostas(new RespostaQuestionarioConhecimentoAlimentarBuilder().cloneList(
                this.getValue(questionarioConhecimentoAlimentar, "getRespostas")));
        
        cloneQuestionarioConhecimentoAlimentar.getRespostas().sort((a,b) => a.getIndicador().getOrdem() - b.getIndicador().getOrdem() );
        cloneQuestionarioConhecimentoAlimentar.getRespostas().forEach(r => {
            r.getIndicador().getItemIndicadorConhecimentoAlimentares().sort((a,b) => a.getOrdem() - b.getOrdem());
        })
        
        return cloneQuestionarioConhecimentoAlimentar;
    }
    
    cloneList(questionarioConhecimentoAlimentares: Array<QuestionarioConhecimentoAlimentar>): Array<QuestionarioConhecimentoAlimentar> {
        let array:Array<QuestionarioConhecimentoAlimentar> = new Array<QuestionarioConhecimentoAlimentar>();
        if (questionarioConhecimentoAlimentares !== null && questionarioConhecimentoAlimentares !== undefined) { 
            for (let questionarioConhecimentoAlimentar of questionarioConhecimentoAlimentares) {
                array.push(this.clone(questionarioConhecimentoAlimentar));
            }
        }
        
        return array;
    }
    
}