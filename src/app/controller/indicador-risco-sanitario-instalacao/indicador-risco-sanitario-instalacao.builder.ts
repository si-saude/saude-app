import { IndicadorRiscoSanitarioInstalacao } from './../../model/indicador-risco-sanitario-instalacao';
import { Instalacao } from './../../model/instalacao';
import { IndicadorRiscoSanitarioBuilder } from './../indicador-risco-sanitario/indicador-risco-sanitario.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class IndicadorRiscoSanitarioInstalacaoBuilder extends GenericBuilder {
    
    initialize(indicadorRiscoSanitarioInstalacao: IndicadorRiscoSanitarioInstalacao) {
        indicadorRiscoSanitarioInstalacao = new IndicadorRiscoSanitarioInstalacao();
        
        indicadorRiscoSanitarioInstalacao.setIndicadorRisco(
            new IndicadorRiscoSanitarioBuilder().initialize(
                    indicadorRiscoSanitarioInstalacao.getIndicadorRisco()));
        
        return indicadorRiscoSanitarioInstalacao;
    }
    
    initializeList(indicadoresRiscoSanitarioInstalacao: Array<IndicadorRiscoSanitarioInstalacao>) {
        
        let array: Array<IndicadorRiscoSanitarioInstalacao> = new Array<IndicadorRiscoSanitarioInstalacao>();
        
        if(indicadoresRiscoSanitarioInstalacao === null || indicadoresRiscoSanitarioInstalacao === undefined)
            indicadoresRiscoSanitarioInstalacao = new Array<IndicadorRiscoSanitarioInstalacao>();
        
        for (let indicadorRiscoSanitarioInstalacao of indicadoresRiscoSanitarioInstalacao) {
            array.push(this.initialize(indicadorRiscoSanitarioInstalacao));
        }
        
        return array;
    }
    
    clone(indicadorRiscoSanitarioInstalacao: IndicadorRiscoSanitarioInstalacao): IndicadorRiscoSanitarioInstalacao {
        
        if (indicadorRiscoSanitarioInstalacao === null || indicadorRiscoSanitarioInstalacao === undefined)
            indicadorRiscoSanitarioInstalacao = new IndicadorRiscoSanitarioInstalacao();
        
        let cloneIndicadorRiscoSanitarioInstalacao = new IndicadorRiscoSanitarioInstalacao();
        cloneIndicadorRiscoSanitarioInstalacao.setId(this.getValue(indicadorRiscoSanitarioInstalacao,"getId"));
        cloneIndicadorRiscoSanitarioInstalacao.setVersion(this.getValue(indicadorRiscoSanitarioInstalacao ,"getVersion"));
        cloneIndicadorRiscoSanitarioInstalacao.setAvaliacao(this.getValue(indicadorRiscoSanitarioInstalacao ,"getAvaliacao"));
        cloneIndicadorRiscoSanitarioInstalacao.setDataInspecao(this.getValue(indicadorRiscoSanitarioInstalacao ,"getDataInspecao"));
        cloneIndicadorRiscoSanitarioInstalacao.setIndicadorRisco(
                new IndicadorRiscoSanitarioBuilder().clone(this.getValue(indicadorRiscoSanitarioInstalacao ,"getIndicadorRisco")));
        cloneIndicadorRiscoSanitarioInstalacao.setInstalacao(new Instalacao());

        return cloneIndicadorRiscoSanitarioInstalacao;
    }
    
    cloneList(indicadoresRiscoSanitarioInstalacao: Array<IndicadorRiscoSanitarioInstalacao>): Array<IndicadorRiscoSanitarioInstalacao>{
        let array:Array<IndicadorRiscoSanitarioInstalacao> = new Array<IndicadorRiscoSanitarioInstalacao>();
    
        if (indicadoresRiscoSanitarioInstalacao !== null && indicadoresRiscoSanitarioInstalacao !== undefined) {
            for (let indicadorRiscoSanitarioInstalacao of indicadoresRiscoSanitarioInstalacao) {
                array.push(this.clone(indicadorRiscoSanitarioInstalacao));
            }
        }
    
        return array;
    }
    
}