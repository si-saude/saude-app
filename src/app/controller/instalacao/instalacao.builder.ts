import { Instalacao } from './../../model/instalacao';

import { IndicadorRiscoAcidenteInstalacaoBuilder } from './../indicador-risco-acidente-instalacao/indicador-risco-acidente-instalacao.builder';
import { IndicadorRiscoAmbientalInstalacaoBuilder } from './../indicador-risco-ambiental-instalacao/indicador-risco-ambiental-instalacao.builder';
import { IndicadorRiscoErgonomicoInstalacaoBuilder } from './../indicador-risco-ergonomico-instalacao/indicador-risco-ergonomico-instalacao.builder';
import { IndicadorRiscoSanitarioInstalacaoBuilder } from './../indicador-risco-sanitario-instalacao/indicador-risco-sanitario-instalacao.builder';
import { IndicadorRiscoSaudeAmbientalInstalacaoBuilder } from './../indicador-risco-saude-ambiental-instalacao/indicador-risco-saude-ambiental-instalacao.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class InstalacaoBuilder extends GenericBuilder{
    
    initialize(instalacao: Instalacao): Instalacao {
        instalacao = new Instalacao();
        
        instalacao.setIndicadorRiscoAcidenteInstalacoes(
                new IndicadorRiscoAcidenteInstalacaoBuilder().initializeList(
                        instalacao.getIndicadorRiscoAcidenteInstalacoes()));
        
        instalacao.setIndicadorRiscoAmbientalInstalacoes(
                new IndicadorRiscoAmbientalInstalacaoBuilder().initializeList(
                        instalacao.getIndicadorRiscoAmbientalInstalacoes()));
        
        instalacao.setIndicadorRiscoErgonomicoInstalacoes(
                new IndicadorRiscoErgonomicoInstalacaoBuilder().initializeList(
                        instalacao.getIndicadorRiscoErgonomicoInstalacoes()));
        
        instalacao.setIndicadorRiscoSanitarioInstalacoes(
                new IndicadorRiscoSanitarioInstalacaoBuilder().initializeList(
                        instalacao.getIndicadorRiscoSanitarioInstalacoes()));
        
        instalacao.setIndicadorRiscoSaudeAmbientalInstalacoes(
                new IndicadorRiscoSaudeAmbientalInstalacaoBuilder().initializeList(
                        instalacao.getIndicadorRiscoSaudeAmbientalInstalacoes()));
        
        return instalacao;
    }
    
    initializeList(instalacoes: Array<Instalacao>) {
        
        let array:Array<Instalacao> = new Array<Instalacao>();
        
        if(instalacoes === null || instalacoes === undefined)
            instalacoes = new Array<Instalacao>();
        
        for (let instalacao of instalacoes) {
            array.push(this.initialize(instalacao));
        }
        
        return array;
    }
    
    clone(instalacao: Instalacao): Instalacao {        
        let cloneInstalacao = new Instalacao();
        
        if (instalacao === null || instalacao === undefined)
            instalacao = new Instalacao();
        
        cloneInstalacao.setId(this.getValue(instalacao, "getId"));
        cloneInstalacao.setVersion(this.getValue(instalacao, "getVersion"));
        cloneInstalacao.setNome(this.getValue(instalacao, "getNome"));
        
        cloneInstalacao.setIndicadorRiscoAcidenteInstalacoes(
                new IndicadorRiscoAcidenteInstalacaoBuilder().cloneList(
                        this.getValue(instalacao, "getIndicadorRiscoAcidenteInstalacoes")));
        
        cloneInstalacao.setIndicadorRiscoAmbientalInstalacoes(
                new IndicadorRiscoAmbientalInstalacaoBuilder().cloneList(
                        this.getValue(instalacao, "getIndicadorRiscoAmbientalInstalacoes")));
        
        cloneInstalacao.setIndicadorRiscoErgonomicoInstalacoes(
                new IndicadorRiscoErgonomicoInstalacaoBuilder().cloneList(
                        this.getValue(instalacao, "getIndicadorRiscoErgonomicoInstalacoes")));
        
        cloneInstalacao.setIndicadorRiscoSanitarioInstalacoes(
                new IndicadorRiscoSanitarioInstalacaoBuilder().cloneList(
                        this.getValue(instalacao, "getIndicadorRiscoSanitarioInstalacoes")));
        
        cloneInstalacao.setIndicadorRiscoSaudeAmbientalInstalacoes(
                new IndicadorRiscoSaudeAmbientalInstalacaoBuilder().cloneList(
                        this.getValue(instalacao, "getIndicadorRiscoSaudeAmbientalInstalacoes")));
        
        return cloneInstalacao;
    }
    
    cloneList(instalacoes: Array<Instalacao>){
        
        if(instalacoes === null || instalacoes === undefined)
            instalacoes = new Array<Instalacao>();
        
        let array:Array<Instalacao> = new Array<Instalacao>();
    
        for (let instalacao of instalacoes) {
            array.push(this.clone(instalacao));
        }
    
        return array;
    }
    
}