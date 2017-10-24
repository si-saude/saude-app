import { IndicadorRiscoAmbiental } from './indicador-risco-ambiental';
import { Instalacao } from './instalacao';

export class IndicadorRiscoAmbientalInstalacao{
    private id: number;
    private version: number;
    private instalacao: Instalacao;
    private indicadorRisco: IndicadorRiscoAmbiental;
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
    
    getIndicadorRisco():IndicadorRiscoAmbiental{
        return this.indicadorRisco;
    }
    
    setIndicadorRisco(indicador:IndicadorRiscoAmbiental){
        this.indicadorRisco = indicador;
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