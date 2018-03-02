import { RespostaFichaColeta } from './../../model/resposta-ficha-coleta';
import { FichaColeta } from './../../model/ficha-coleta';
import { PerguntaFichaColeta } from './../../model/pergunta-ficha-coleta';
import { PerguntaFichaColetaBuilder } from './../pergunta-ficha-coleta/pergunta-ficha-coleta.builder';
import { ItemRespostaFichaColeta } from './../../model/item-resposta-ficha-coleta';
import { ItemRespostaFichaColetaBuilder } from './../item-resposta-ficha-coleta/item-resposta-ficha-coleta.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class RespostaFichaColetaBuilder extends GenericBuilder{
    
    initialize(respostaFichaColeta: RespostaFichaColeta): RespostaFichaColeta {
        respostaFichaColeta = new RespostaFichaColeta();
        
        respostaFichaColeta.setFicha(new FichaColeta());
        respostaFichaColeta.setPergunta(
                new PerguntaFichaColetaBuilder().initialize(new PerguntaFichaColeta()));
        respostaFichaColeta.setItens(
                new ItemRespostaFichaColetaBuilder().initializeList(new Array<ItemRespostaFichaColeta>()));
        
        return respostaFichaColeta;
    }
    
    initializeList(respostaFichaColetas: Array<RespostaFichaColeta>) {
        
        let array: Array<RespostaFichaColeta> = new Array<RespostaFichaColeta>();
        
        if(respostaFichaColetas === null || respostaFichaColetas === undefined)
            respostaFichaColetas = new Array<RespostaFichaColeta>();
        
        for (let respostaFichaColeta of respostaFichaColetas) {
            array.push(this.initialize(respostaFichaColeta));
        }
        
        return array;
    }
    
    clone(respostaFichaColeta: RespostaFichaColeta): RespostaFichaColeta {        
        let cloneRespostaFichaColeta = new RespostaFichaColeta();
        
        if (respostaFichaColeta === null || respostaFichaColeta === undefined)
            respostaFichaColeta = new RespostaFichaColeta();
        
        cloneRespostaFichaColeta.setId(this.getValue(respostaFichaColeta, "getId"));
        cloneRespostaFichaColeta.setVersion(this.getValue(respostaFichaColeta, "getVersion"));
        cloneRespostaFichaColeta.setConteudo(this.getValue(respostaFichaColeta, "getConteudo"));
        
        cloneRespostaFichaColeta.setFicha(new FichaColeta());
        cloneRespostaFichaColeta.setItens(
                new ItemRespostaFichaColetaBuilder().cloneList(this.getValue(respostaFichaColeta, "getItens")));
        cloneRespostaFichaColeta.setPergunta(
                new PerguntaFichaColetaBuilder().clone(this.getValue(respostaFichaColeta, "getPergunta")));
        
        return cloneRespostaFichaColeta;
    } 
    
    cloneList(respostaFichaColetas: Array<RespostaFichaColeta>): Array<RespostaFichaColeta>{
        let array:Array<RespostaFichaColeta> = new Array<RespostaFichaColeta>();
    
        if (respostaFichaColetas !== null && respostaFichaColetas !== undefined) {
            for (let respostaFichaColeta of respostaFichaColetas) {
                array.push(this.clone(respostaFichaColeta));
            }
        }
    
        return array;
    }
    
}