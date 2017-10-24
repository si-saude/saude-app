import { IndicadorRiscoErgonomicoInstalacao } from './../../model/indicador-risco-ergonomico-instalacao';
import { Instalacao } from './../../model/instalacao';
import { IndicadorRiscoErgonomicoBuilder } from './../indicador-risco-ergonomico/indicador-risco-ergonomico.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class IndicadorRiscoErgonomicoInstalacaoBuilder extends GenericBuilder {
    
    initialize(indicadorRiscoErgonomicoInstalacao: IndicadorRiscoErgonomicoInstalacao) {
        indicadorRiscoErgonomicoInstalacao = new IndicadorRiscoErgonomicoInstalacao();
        
        indicadorRiscoErgonomicoInstalacao.setIndicadorRisco(
            new IndicadorRiscoErgonomicoBuilder().initialize(
                    indicadorRiscoErgonomicoInstalacao.getIndicadorRisco()));
        
        return indicadorRiscoErgonomicoInstalacao;
    }
    
    initializeList(indicadoresRiscoErgonomicoInstalacao: Array<IndicadorRiscoErgonomicoInstalacao>) {
        
        let array: Array<IndicadorRiscoErgonomicoInstalacao> = new Array<IndicadorRiscoErgonomicoInstalacao>();
        
        if(indicadoresRiscoErgonomicoInstalacao === null || indicadoresRiscoErgonomicoInstalacao === undefined)
            indicadoresRiscoErgonomicoInstalacao = new Array<IndicadorRiscoErgonomicoInstalacao>();
        
        for (let indicadorRiscoErgonomicoInstalacao of indicadoresRiscoErgonomicoInstalacao) {
            array.push(this.initialize(indicadorRiscoErgonomicoInstalacao));
        }
        
        return array;
    }
    
    clone(indicadorRiscoErgonomicoInstalacao: IndicadorRiscoErgonomicoInstalacao): IndicadorRiscoErgonomicoInstalacao {
        
        if (indicadorRiscoErgonomicoInstalacao === null || indicadorRiscoErgonomicoInstalacao === undefined)
            indicadorRiscoErgonomicoInstalacao = new IndicadorRiscoErgonomicoInstalacao();
        
        let cloneIndicadorRiscoErgonomicoInstalacao = new IndicadorRiscoErgonomicoInstalacao();
        cloneIndicadorRiscoErgonomicoInstalacao.setId(this.getValue(indicadorRiscoErgonomicoInstalacao,"getId"));
        cloneIndicadorRiscoErgonomicoInstalacao.setVersion(this.getValue(indicadorRiscoErgonomicoInstalacao ,"getVersion"));
        cloneIndicadorRiscoErgonomicoInstalacao.setAvaliacao(this.getValue(indicadorRiscoErgonomicoInstalacao ,"getAvaliacao"));
        cloneIndicadorRiscoErgonomicoInstalacao.setDataInspecao(this.getValue(indicadorRiscoErgonomicoInstalacao ,"getDataInspecao"));
        cloneIndicadorRiscoErgonomicoInstalacao.setIndicadorRisco(
                new IndicadorRiscoErgonomicoBuilder().clone(this.getValue(indicadorRiscoErgonomicoInstalacao ,"getIndicadorRisco")));
        cloneIndicadorRiscoErgonomicoInstalacao.setInstalacao(new Instalacao());

        return cloneIndicadorRiscoErgonomicoInstalacao;
    }
    
    cloneList(indicadoresRiscoErgonomicoInstalacao: Array<IndicadorRiscoErgonomicoInstalacao>): Array<IndicadorRiscoErgonomicoInstalacao>{
        let array:Array<IndicadorRiscoErgonomicoInstalacao> = new Array<IndicadorRiscoErgonomicoInstalacao>();
    
        if (indicadoresRiscoErgonomicoInstalacao !== null && indicadoresRiscoErgonomicoInstalacao !== undefined) {
            for (let indicadorRiscoErgonomicoInstalacao of indicadoresRiscoErgonomicoInstalacao) {
                array.push(this.clone(indicadorRiscoErgonomicoInstalacao));
            }
        }
    
        return array;
    }
    
}