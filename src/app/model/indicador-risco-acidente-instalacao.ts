import { IndicadorRiscoAcidente } from './indicador-risco-acidente';
import { Instalacao } from './instalacao';

export class IndicadorRiscoAcidenteInstalacao{
    private id: number;
    private version: number;
    private instalacao: Instalacao;
    private indicadorRiscoAcidente: IndicadorRiscoAcidente;
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
    
    getIndicadorRiscoAcidente():IndicadorRiscoAcidente{
        return this.indicadorRiscoAcidente;
    }
    
    setIndicadorRiscoAcidente(indicador:IndicadorRiscoAcidente){
        this.indicadorRiscoAcidente = indicador;
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