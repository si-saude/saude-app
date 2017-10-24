import { IndicadorRiscoAmbientalInstalacao } from './../../model/indicador-risco-ambiental-instalacao';
import { Instalacao } from './../../model/instalacao';
import { IndicadorRiscoAmbientalBuilder } from './../indicador-risco-ambiental/indicador-risco-ambiental.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class IndicadorRiscoAmbientalInstalacaoBuilder extends GenericBuilder {
    
    initialize(indicadorRiscoAmbientalInstalacao: IndicadorRiscoAmbientalInstalacao) {
        indicadorRiscoAmbientalInstalacao = new IndicadorRiscoAmbientalInstalacao();
        
        indicadorRiscoAmbientalInstalacao.setIndicadorRisco(
            new IndicadorRiscoAmbientalBuilder().initialize(
                    indicadorRiscoAmbientalInstalacao.getIndicadorRisco()));
        
        return indicadorRiscoAmbientalInstalacao;
    }
    
    initializeList(indicadoresRiscoAmbientalInstalacao: Array<IndicadorRiscoAmbientalInstalacao>) {
        
        let array: Array<IndicadorRiscoAmbientalInstalacao> = new Array<IndicadorRiscoAmbientalInstalacao>();
        
        if(indicadoresRiscoAmbientalInstalacao === null || indicadoresRiscoAmbientalInstalacao === undefined)
            indicadoresRiscoAmbientalInstalacao = new Array<IndicadorRiscoAmbientalInstalacao>();
        
        for (let indicadorRiscoAmbientalInstalacao of indicadoresRiscoAmbientalInstalacao) {
            array.push(this.initialize(indicadorRiscoAmbientalInstalacao));
        }
        
        return array;
    }
    
    clone(indicadorRiscoAmbientalInstalacao: IndicadorRiscoAmbientalInstalacao): IndicadorRiscoAmbientalInstalacao {
        
        if (indicadorRiscoAmbientalInstalacao === null || indicadorRiscoAmbientalInstalacao === undefined)
            indicadorRiscoAmbientalInstalacao = new IndicadorRiscoAmbientalInstalacao();
        
        let cloneIndicadorRiscoAmbientalInstalacao = new IndicadorRiscoAmbientalInstalacao();
        cloneIndicadorRiscoAmbientalInstalacao.setId(this.getValue(indicadorRiscoAmbientalInstalacao,"getId"));
        cloneIndicadorRiscoAmbientalInstalacao.setVersion(this.getValue(indicadorRiscoAmbientalInstalacao ,"getVersion"));
        cloneIndicadorRiscoAmbientalInstalacao.setAvaliacao(this.getValue(indicadorRiscoAmbientalInstalacao ,"getAvaliacao"));
        cloneIndicadorRiscoAmbientalInstalacao.setDataInspecao(this.getValue(indicadorRiscoAmbientalInstalacao ,"getDataInspecao"));
        cloneIndicadorRiscoAmbientalInstalacao.setIndicadorRisco(
                new IndicadorRiscoAmbientalBuilder().clone(this.getValue(indicadorRiscoAmbientalInstalacao ,"getIndicadorRisco")));
        cloneIndicadorRiscoAmbientalInstalacao.setInstalacao(new Instalacao());

        return cloneIndicadorRiscoAmbientalInstalacao;
    }
    
    cloneList(indicadoresRiscoAmbientalInstalacao: Array<IndicadorRiscoAmbientalInstalacao>): Array<IndicadorRiscoAmbientalInstalacao>{
        let array:Array<IndicadorRiscoAmbientalInstalacao> = new Array<IndicadorRiscoAmbientalInstalacao>();
    
        if (indicadoresRiscoAmbientalInstalacao !== null && indicadoresRiscoAmbientalInstalacao !== undefined) {
            for (let indicadorRiscoAmbientalInstalacao of indicadoresRiscoAmbientalInstalacao) {
                array.push(this.clone(indicadorRiscoAmbientalInstalacao));
            }
        }
    
        return array;
    }
    
}