import { IndicadorRiscoAcidenteInstalacao } from './indicador-risco-acidente-instalacao';
import { IndicadorRiscoAmbientalInstalacao } from './indicador-risco-ambiental-instalacao';
import { IndicadorRiscoErgonomicoInstalacao } from './indicador-risco-ergonomico-instalacao';
import { IndicadorRiscoSanitarioInstalacao } from './indicador-risco-sanitario-instalacao';
import { IndicadorRiscoSaudeAmbientalInstalacao } from './indicador-risco-saude-ambiental-instalacao';

export class Instalacao {
    private id: number = 0;
    private version: number;
    private nome: string;
    private indicadorRiscoAcidenteInstalacoes: Array<IndicadorRiscoAcidenteInstalacao>;
    private indicadorRiscoAmbientalInstalacoes: Array<IndicadorRiscoAmbientalInstalacao>;
    private indicadorRiscoErgonomicoInstalacoes: Array<IndicadorRiscoErgonomicoInstalacao>;
    private indicadorRiscoSanitarioInstalacoes: Array<IndicadorRiscoSanitarioInstalacao>;
    private indicadorRiscoSaudeAmbientalInstalacoes: Array<IndicadorRiscoSaudeAmbientalInstalacao>;

    getId(): number {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getVersion(): number {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
    getNome():string{
        return this.nome;
    }
    
    setNome(nome:string){
        this.nome = nome;
    }
    
    getIndicadorRiscoAcidenteInstalacoes():Array<IndicadorRiscoAcidenteInstalacao>{
        return this.indicadorRiscoAcidenteInstalacoes;
    }
    
    setIndicadorRiscoAcidenteInstalacoes(array:Array<IndicadorRiscoAcidenteInstalacao>){
        this.indicadorRiscoAcidenteInstalacoes = array;
    }
    
    getIndicadorRiscoAmbientalInstalacoes():Array<IndicadorRiscoAmbientalInstalacao>{
        return this.indicadorRiscoAmbientalInstalacoes;
    }
    
    setIndicadorRiscoAmbientalInstalacoes(array:Array<IndicadorRiscoAmbientalInstalacao>){
        this.indicadorRiscoAmbientalInstalacoes = array;
    }
    
    getIndicadorRiscoErgonomicoInstalacoes():Array<IndicadorRiscoErgonomicoInstalacao>{
        return this.indicadorRiscoErgonomicoInstalacoes;
    }
    
    setIndicadorRiscoErgonomicoInstalacoes(array:Array<IndicadorRiscoErgonomicoInstalacao>){
        this.indicadorRiscoErgonomicoInstalacoes = array;
    }
    
    getIndicadorRiscoSanitarioInstalacoes():Array<IndicadorRiscoSanitarioInstalacao>{
        return this.indicadorRiscoSanitarioInstalacoes;
    }
    
    setIndicadorRiscoSanitarioInstalacoes(array:Array<IndicadorRiscoSanitarioInstalacao>){
        this.indicadorRiscoSanitarioInstalacoes = array;
    }
    
    getIndicadorRiscoSaudeAmbientalInstalacoes():Array<IndicadorRiscoSaudeAmbientalInstalacao>{
        return this.indicadorRiscoSaudeAmbientalInstalacoes;
    }
    
    setIndicadorRiscoSaudeAmbientalInstalacoes(array:Array<IndicadorRiscoSaudeAmbientalInstalacao>){
        this.indicadorRiscoSaudeAmbientalInstalacoes = array;
    }
}