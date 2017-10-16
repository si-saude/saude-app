import { IndicadorRiscoSanitario } from './indicador-risco-sanitario';
import { Instalacao } from './instalacao';

export class IndicadorRiscoSanitarioInstalacao{
    private id: number;
    private version: number;
    private instalacao: Instalacao;
    private indicadorRiscoSanitario: IndicadorRiscoSanitario;
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
    
    getIndicadorRiscoSanitario():IndicadorRiscoSanitario{
        return this.indicadorRiscoSanitario;
    }
    
    setIndicadorRiscoSanitario(indicador:IndicadorRiscoSanitario){
        this.indicadorRiscoSanitario = indicador;
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