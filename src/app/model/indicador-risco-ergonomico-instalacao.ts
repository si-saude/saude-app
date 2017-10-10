import { IndicadorRiscoErgonomico } from './indicador-risco-ergonomico';
import { Instalacao } from './instalacao';

export class IndicadorRiscoErgonomicoInstalacao{
    private id: number;
    private version: number;
    private instalacao: Instalacao;
    private indicadorRiscoErgonomico: IndicadorRiscoErgonomico;
    private dataInspecao: Date;
    private avaliacao: number;
    
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
    
    getInstalacao():Instalacao{
        return this.instalacao;
    }
    
    setInstalacao(instalacao:Instalacao){
        this.instalacao = instalacao;
    }
    
    getIndicadorRiscoErgonomico():IndicadorRiscoErgonomico{
        return this.indicadorRiscoErgonomico;
    }
    
    setIndicadorRiscoErgonomico(indicador:IndicadorRiscoErgonomico){
        this.indicadorRiscoErgonomico = indicador;
    }
    
    getDataInspecao():Date{
        return this.dataInspecao;
    }
    
    setDataInspecao(dataInspecao:Date){
        this.dataInspecao = dataInspecao;
    }
    
    getAvaliacao():number{
        return this.avaliacao;
    }
    
    setAvaliacao(avaliacao:number){
        this.avaliacao = avaliacao;
    }
}