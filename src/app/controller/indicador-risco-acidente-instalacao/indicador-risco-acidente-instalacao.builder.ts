import { IndicadorRiscoAcidenteInstalacao } from './../../model/indicador-risco-acidente-instalacao';
import { Instalacao } from './../../model/instalacao';
import { InstalacaoBuilder } from './../instalacao/instalacao.builder';
import { IndicadorRiscoAcidenteBuilder } from './../indicador-risco-acidente/indicador-risco-acidente.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class IndicadorRiscoAcidenteInstalacaoBuilder extends GenericBuilder {
    
    initialize(indicadorRiscoAcidenteInstalacao: IndicadorRiscoAcidenteInstalacao) {
        indicadorRiscoAcidenteInstalacao = new IndicadorRiscoAcidenteInstalacao();
        
        indicadorRiscoAcidenteInstalacao.setInstalacao(new InstalacaoBuilder().initialize(new Instalacao()));
        indicadorRiscoAcidenteInstalacao.setIndicadorRisco(
            new IndicadorRiscoAcidenteBuilder().initialize(
                    indicadorRiscoAcidenteInstalacao.getIndicadorRisco()));
        
        return indicadorRiscoAcidenteInstalacao;
    }
    
    initializeList(indicadoresRiscoAcidenteInstalacao: Array<IndicadorRiscoAcidenteInstalacao>) {
        
        let array: Array<IndicadorRiscoAcidenteInstalacao> = new Array<IndicadorRiscoAcidenteInstalacao>();
        
        if(indicadoresRiscoAcidenteInstalacao === null || indicadoresRiscoAcidenteInstalacao === undefined)
            indicadoresRiscoAcidenteInstalacao = new Array<IndicadorRiscoAcidenteInstalacao>();
        
        for (let indicadorRiscoAcidenteInstalacao of indicadoresRiscoAcidenteInstalacao) {
            array.push(this.initialize(indicadorRiscoAcidenteInstalacao));
        }
        
        return array;
    }
    
    clone(indicadorRiscoAcidenteInstalacao: IndicadorRiscoAcidenteInstalacao): IndicadorRiscoAcidenteInstalacao {
        
        if (indicadorRiscoAcidenteInstalacao === null || indicadorRiscoAcidenteInstalacao === undefined)
            indicadorRiscoAcidenteInstalacao = new IndicadorRiscoAcidenteInstalacao();
        
        let cloneIndicadorRiscoAcidenteInstalacao = new IndicadorRiscoAcidenteInstalacao();
        cloneIndicadorRiscoAcidenteInstalacao.setId(this.getValue(indicadorRiscoAcidenteInstalacao,"getId"));
        cloneIndicadorRiscoAcidenteInstalacao.setVersion(this.getValue(indicadorRiscoAcidenteInstalacao ,"getVersion"));
        cloneIndicadorRiscoAcidenteInstalacao.setAvaliacao(this.getValue(indicadorRiscoAcidenteInstalacao ,"getAvaliacao"));
        cloneIndicadorRiscoAcidenteInstalacao.setDataInspecao(this.getValue(indicadorRiscoAcidenteInstalacao ,"getDataInspecao"));
        cloneIndicadorRiscoAcidenteInstalacao.setIndicadorRisco(
                new IndicadorRiscoAcidenteBuilder().clone(this.getValue(indicadorRiscoAcidenteInstalacao ,"getIndicadorRisco")));
        cloneIndicadorRiscoAcidenteInstalacao.setInstalacao(new Instalacao());
        
        return cloneIndicadorRiscoAcidenteInstalacao;
    }
    
    cloneList(indicadoresRiscoAcidenteInstalacao: Array<IndicadorRiscoAcidenteInstalacao>): Array<IndicadorRiscoAcidenteInstalacao>{
        let array:Array<IndicadorRiscoAcidenteInstalacao> = new Array<IndicadorRiscoAcidenteInstalacao>();
    
        if (indicadoresRiscoAcidenteInstalacao !== null && indicadoresRiscoAcidenteInstalacao !== undefined) {
            for (let indicadorRiscoAcidenteInstalacao of indicadoresRiscoAcidenteInstalacao) {
                array.push(this.clone(indicadorRiscoAcidenteInstalacao));
            }
        }
    
        return array;
    }
    
}