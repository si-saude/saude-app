import { RespostaQuestionarioConhecimentoAlimentar } from './../../model/resposta-questionario-conhecimento-alimentar';
import { IndicadorConhecimentoAlimentarBuilder } from './../indicador-conhecimento-alimentar/indicador-conhecimento-alimentar.builder';
import { ItemIndicadorConhecimentoAlimentarBuilder } from './../item-indicador-conhecimento-alimentar/item-indicador-conhecimento-alimentar.builder';
import { QuestionarioConhecimentoAlimentarBuilder } from './../questionario-conhecimento-alimentar/questionario-conhecimento-alimentar.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class RespostaQuestionarioConhecimentoAlimentarBuilder extends GenericBuilder{
    
    initialize(respostaQuestionarioConhecimentoAlimentar: RespostaQuestionarioConhecimentoAlimentar): RespostaQuestionarioConhecimentoAlimentar {
        respostaQuestionarioConhecimentoAlimentar = new RespostaQuestionarioConhecimentoAlimentar();
        respostaQuestionarioConhecimentoAlimentar.setIndicador(new IndicadorConhecimentoAlimentarBuilder().initialize(null));
        respostaQuestionarioConhecimentoAlimentar.setItem(new ItemIndicadorConhecimentoAlimentarBuilder().initialize(null));
        respostaQuestionarioConhecimentoAlimentar.setQuestionario(new QuestionarioConhecimentoAlimentarBuilder().initialize(null));

        return respostaQuestionarioConhecimentoAlimentar;
    }
    
    initializeList(respostaQuestionarioConhecimentoAlimentares: Array<RespostaQuestionarioConhecimentoAlimentar>) {
        
        let array: Array<RespostaQuestionarioConhecimentoAlimentar> = new Array<RespostaQuestionarioConhecimentoAlimentar>();
        
        if(respostaQuestionarioConhecimentoAlimentares === null || respostaQuestionarioConhecimentoAlimentares === undefined)
            respostaQuestionarioConhecimentoAlimentares = new Array<RespostaQuestionarioConhecimentoAlimentar>();
        
        for (let respostaQuestionarioConhecimentoAlimentar of respostaQuestionarioConhecimentoAlimentares) {
            array.push(this.initialize(respostaQuestionarioConhecimentoAlimentar));
        }
        
        return array;
    }
    
    clone(respostaQuestionarioConhecimentoAlimentar: RespostaQuestionarioConhecimentoAlimentar): RespostaQuestionarioConhecimentoAlimentar {        
        let cloneRespostaQuestionarioConhecimentoAlimentar = new RespostaQuestionarioConhecimentoAlimentar();
        
        cloneRespostaQuestionarioConhecimentoAlimentar.setId(this.getValue(respostaQuestionarioConhecimentoAlimentar, "getId"));
        cloneRespostaQuestionarioConhecimentoAlimentar.setVersion(this.getValue(respostaQuestionarioConhecimentoAlimentar, "getVersion"));

        cloneRespostaQuestionarioConhecimentoAlimentar.setIndicador(
                new IndicadorConhecimentoAlimentarBuilder().clone(
                        this.getValue(respostaQuestionarioConhecimentoAlimentar, "getIndicador")));
        
        cloneRespostaQuestionarioConhecimentoAlimentar.setItem(
                new ItemIndicadorConhecimentoAlimentarBuilder().clone(
                        this.getValue(respostaQuestionarioConhecimentoAlimentar, "getItem")));
        
        cloneRespostaQuestionarioConhecimentoAlimentar.setQuestionario(
                new QuestionarioConhecimentoAlimentarBuilder().clone(
                        this.getValue(respostaQuestionarioConhecimentoAlimentar, "getQuestionario")));
        
        return cloneRespostaQuestionarioConhecimentoAlimentar;
    } 
    
    cloneList(respostaQuestionarioConhecimentoAlimentares: Array<RespostaQuestionarioConhecimentoAlimentar>): Array<RespostaQuestionarioConhecimentoAlimentar>{
        let array:Array<RespostaQuestionarioConhecimentoAlimentar> = new Array<RespostaQuestionarioConhecimentoAlimentar>();
    
        if (respostaQuestionarioConhecimentoAlimentares !== null && respostaQuestionarioConhecimentoAlimentares !== undefined) {
            for (let respostaQuestionarioConhecimentoAlimentar of respostaQuestionarioConhecimentoAlimentares) {
                array.push(this.clone(respostaQuestionarioConhecimentoAlimentar));
            }
        }
    
        return array;
    }
    
}