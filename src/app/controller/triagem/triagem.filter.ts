import { GenericFilter } from './../../generics/generic.filter';
import { RiscoEmpregadoFilter } from './../risco-empregado/risco-empregado.filter';
import { EquipeFilter } from './../equipe/equipe.filter';
import { IndicadorSastFilter } from './../indicador-sast/indicador-sast.filter';

export class TriagemFilter extends GenericFilter {
    private riscoEmpregado: RiscoEmpregadoFilter;
    private equipeAbordagem: EquipeFilter;
    private indicadorSast: IndicadorSastFilter;
    
    getIndicadorSast() {
        return this.indicadorSast;
    }
    
    setIndicadorSast(indicadorSast: IndicadorSastFilter) {
        this.indicadorSast = indicadorSast;
    }

    getEquipeAbordagem() {
        return this.equipeAbordagem;
    }
    
    setEquipeAbordagem(equipeAbordagem: EquipeFilter) {
        this.equipeAbordagem = equipeAbordagem;
    }

    getRiscoEmpregado() {
        return this.riscoEmpregado;
    }

    setRiscoEmpregado(riscoEmpregado: RiscoEmpregadoFilter) {
        this.riscoEmpregado = riscoEmpregado;
    }
}
