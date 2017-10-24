import { IndicadorRiscoSaudeAmbientalInstalacao } from './../../model/indicador-risco-saude-ambiental-instalacao';
import { Instalacao } from './../../model/instalacao';
import { IndicadorRiscoSaudeAmbientalBuilder } from './../indicador-risco-saude-ambiental/indicador-risco-saude-ambiental.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class IndicadorRiscoSaudeAmbientalInstalacaoBuilder extends GenericBuilder {
    
    initialize(indicadorRiscoSaudeAmbientalInstalacao: IndicadorRiscoSaudeAmbientalInstalacao) {
        indicadorRiscoSaudeAmbientalInstalacao = new IndicadorRiscoSaudeAmbientalInstalacao();
        
        indicadorRiscoSaudeAmbientalInstalacao.setIndicadorRisco(
            new IndicadorRiscoSaudeAmbientalBuilder().initialize(
                    indicadorRiscoSaudeAmbientalInstalacao.getIndicadorRisco()));
        
        return indicadorRiscoSaudeAmbientalInstalacao;
    }
    
    initializeList(indicadoresRiscoSaudeAmbientalInstalacao: Array<IndicadorRiscoSaudeAmbientalInstalacao>) {
        
        let array: Array<IndicadorRiscoSaudeAmbientalInstalacao> = new Array<IndicadorRiscoSaudeAmbientalInstalacao>();
        
        if(indicadoresRiscoSaudeAmbientalInstalacao === null || indicadoresRiscoSaudeAmbientalInstalacao === undefined)
            indicadoresRiscoSaudeAmbientalInstalacao = new Array<IndicadorRiscoSaudeAmbientalInstalacao>();
        
        for (let indicadorRiscoSaudeAmbientalInstalacao of indicadoresRiscoSaudeAmbientalInstalacao) {
            array.push(this.initialize(indicadorRiscoSaudeAmbientalInstalacao));
        }
        
        return array;
    }
    
    clone(indicadorRiscoSaudeAmbientalInstalacao: IndicadorRiscoSaudeAmbientalInstalacao): IndicadorRiscoSaudeAmbientalInstalacao {
        
        if (indicadorRiscoSaudeAmbientalInstalacao === null || indicadorRiscoSaudeAmbientalInstalacao === undefined)
            indicadorRiscoSaudeAmbientalInstalacao = new IndicadorRiscoSaudeAmbientalInstalacao();
        
        let cloneIndicadorRiscoSaudeAmbientalInstalacao = new IndicadorRiscoSaudeAmbientalInstalacao();
        cloneIndicadorRiscoSaudeAmbientalInstalacao.setId(this.getValue(indicadorRiscoSaudeAmbientalInstalacao,"getId"));
        cloneIndicadorRiscoSaudeAmbientalInstalacao.setVersion(this.getValue(indicadorRiscoSaudeAmbientalInstalacao ,"getVersion"));
        cloneIndicadorRiscoSaudeAmbientalInstalacao.setAvaliacao(this.getValue(indicadorRiscoSaudeAmbientalInstalacao ,"getAvaliacao"));
        cloneIndicadorRiscoSaudeAmbientalInstalacao.setDataInspecao(this.getValue(indicadorRiscoSaudeAmbientalInstalacao ,"getDataInspecao"));
        cloneIndicadorRiscoSaudeAmbientalInstalacao.setIndicadorRisco(
                new IndicadorRiscoSaudeAmbientalBuilder().clone(this.getValue(indicadorRiscoSaudeAmbientalInstalacao ,"getIndicadorRisco")));
        cloneIndicadorRiscoSaudeAmbientalInstalacao.setInstalacao(new Instalacao());

        return cloneIndicadorRiscoSaudeAmbientalInstalacao;
    }
    
    cloneList(indicadoresRiscoSaudeAmbientalInstalacao: Array<IndicadorRiscoSaudeAmbientalInstalacao>): Array<IndicadorRiscoSaudeAmbientalInstalacao>{
        let array:Array<IndicadorRiscoSaudeAmbientalInstalacao> = new Array<IndicadorRiscoSaudeAmbientalInstalacao>();
    
        if (indicadoresRiscoSaudeAmbientalInstalacao !== null && indicadoresRiscoSaudeAmbientalInstalacao !== undefined) {
            for (let indicadorRiscoSaudeAmbientalInstalacao of indicadoresRiscoSaudeAmbientalInstalacao) {
                array.push(this.clone(indicadorRiscoSaudeAmbientalInstalacao));
            }
        }
    
        return array;
    }
    
}