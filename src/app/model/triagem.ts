import { IndicadorSast } from './indicador-sast';
import { Atendimento } from './atendimento';
import { RiscoEmpregado } from './risco-empregado';

export class Triagem {
    private id: number;
    private indicadorSast: IndicadorSast;
    private atendimento: Atendimento;
    private indice: number = -1;
    private riscoEmpregado: RiscoEmpregado;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getIndicadorSast() {
        return this.indicadorSast;
    }

    setIndicadorSast(indicadorSast: IndicadorSast) {
        this.indicadorSast = indicadorSast;
    }
    
    getAtendimento() {
        return this.atendimento;
    }

    setAtendimento(atendimento: Atendimento) {
        this.atendimento = atendimento;
    }

    getIndice() {
        return this.indice;
    }

    setIndice(indice: number) {
        this.indice = indice;
    }
    
    getRiscoEmpregado() {
        return this.riscoEmpregado;
    }
    
    setRiscoEmpregado(riscoEmpregado: RiscoEmpregado) {
        this.riscoEmpregado = riscoEmpregado;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}