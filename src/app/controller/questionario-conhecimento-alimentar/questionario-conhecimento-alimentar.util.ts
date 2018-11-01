import { RespostaQuestionarioConhecimentoAlimentar } from './../../model/resposta-questionario-conhecimento-alimentar';
import { ItemIndicadorConhecimentoAlimentar } from './../../model/item-indicador-conhecimento-alimentar';

export class QuestionarioConhecimentoAlimentarUtil {
    public selectItem(resposta: RespostaQuestionarioConhecimentoAlimentar, item: ItemIndicadorConhecimentoAlimentar, r) {
        if ( resposta.getItem() != undefined && item.getId() == resposta.getItem().getId() )
            resposta.setItem(undefined);
        else resposta.setItem(item);
        this.setBackgroundItens(resposta, item, r);
    }
    
    public setBackgroundItens(resposta: RespostaQuestionarioConhecimentoAlimentar, item: ItemIndicadorConhecimentoAlimentar, r) {
        let itens = resposta.getIndicador().getItemIndicadorConhecimentoAlimentares();
        for (let i = 0; i < itens.length; i++) {
            if ( resposta.getItem() != undefined && itens[i].getId() == item.getId() )
                $(".item-"+r+"-"+i).css("background-color", "#5e93ff");
            else $(".item-"+r+"-"+i).css("background-color", "#ddd");
        }
    }
}